import {durationOfDay} from '@/const/common';
import {efficiencyInSleep} from '@/const/game/efficiency';
import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaEfficiency} from '@/types/game/stamina/efficiency';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getEfficiency} from '@/utils/game/stamina/efficiency';
import {getLogsWithEfficiencyBlock} from '@/utils/game/stamina/events/block';
import {getLogsWithEndOfPeriodMark} from '@/utils/game/stamina/events/endOfPeriod';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';


type GetStaminaEventLogOpts = {
  config: StaminaCalcConfig,
  sessionInfo: SleepSessionInfo,
  skillTriggers: StaminaSkillTriggerData[],
};

const getStaminaEventLogs = ({config, sessionInfo, skillTriggers}: GetStaminaEventLogOpts): StaminaEventLog[] => {
  let logs = getLogsWithPrimarySleep({sessionInfo, skillTriggers, ...config});
  logs = getLogsWithSecondarySleep({sessionInfo, logs, ...config});
  logs = getLogsWithSkillRecovery({sessionInfo, logs, skillTriggers, ...config});
  logs = getLogsWithEndOfPeriodMark({logs});
  logs = getLogsWithEfficiencyBlock({logs});

  return logs;
};

export const getDailyAverageStaminaEfficiencyFromLogs = (logs: StaminaEventLog[]): number => {
  let sumOfWeightedDuration = 0;

  for (let i = 1; i < logs.length; i++) {
    const prev = logs[i - 1];
    const curr = logs[i];

    const blockEfficiency = getEfficiency({stamina: prev.stamina.after});
    const duration = curr.timing - prev.timing;

    sumOfWeightedDuration += blockEfficiency * duration;
  }

  return sumOfWeightedDuration / durationOfDay;
};

export const getStaminaEfficiency = (opts: GetStaminaEventLogOpts): StaminaEfficiency => {
  const {sessionInfo} = opts;

  const logs = getStaminaEventLogs(opts);
  const staminaDailyAverage = getDailyAverageStaminaEfficiencyFromLogs(logs);
  const totalSleepDuration = durationOfDay - sessionInfo.duration.awake;

  return {
    logs,
    average: staminaDailyAverage,
    sleep: efficiencyInSleep,
    awake: (
      (staminaDailyAverage * durationOfDay - efficiencyInSleep * totalSleepDuration) /
      (durationOfDay - totalSleepDuration)
    ),
  };
};
