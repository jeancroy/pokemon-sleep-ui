import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaEfficiency, StaminaEfficiencyCounter} from '@/types/game/stamina/efficiency';
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

export const getStaminaEfficiencyMultiplierFromLogs = (logs: StaminaEventLog[]): StaminaEfficiencyCounter => {
  const durationCounter: StaminaEfficiencyCounter = {
    sleep: 0,
    awake: 0,
    average: 0,
  };
  const weightedDurationCounter: StaminaEfficiencyCounter = {
    sleep: 0,
    awake: 0,
    average: 0,
  };

  let isDuringSleep = false;

  for (let i = 1; i < logs.length; i++) {
    const prev = logs[i - 1];
    const curr = logs[i];

    const blockEfficiency = getEfficiency({stamina: prev.stamina.after});
    const durationOfLog = curr.timing - prev.timing;

    const weightedDuration = blockEfficiency * durationOfLog;

    durationCounter.average += durationOfLog;
    weightedDurationCounter.average += weightedDuration;
    if (isDuringSleep) {
      durationCounter.sleep += durationOfLog;
      weightedDurationCounter.sleep += weightedDuration;
    } else {
      durationCounter.awake += durationOfLog;
      weightedDurationCounter.awake += weightedDuration;
    }

    if (curr.type === 'sleep') {
      isDuringSleep = true;
    } else if (isDuringSleep && curr.type === 'wakeup') {
      isDuringSleep = false;
    }
  }

  return {
    sleep: weightedDurationCounter.sleep / durationCounter.sleep,
    awake: weightedDurationCounter.awake / durationCounter.awake,
    average: weightedDurationCounter.average / durationCounter.average,
  };
};

export const getStaminaEfficiency = (opts: GetStaminaEventLogOpts): StaminaEfficiency => {
  const logs = getStaminaEventLogs(opts);
  const staminaEfficiencyMultiplier = getStaminaEfficiencyMultiplierFromLogs(logs);

  return {
    logs,
    multiplier: staminaEfficiencyMultiplier,
  };
};
