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
import {extractIntervalsDuringSleep} from '@/utils/game/stamina/interval';


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

type GetStaminaEfficiencyMultiplierFromLogsOpts = {
  logs: StaminaEventLog[],
  hasSecondary: boolean,
};

export const getStaminaEfficiencyMultiplierFromLogs = ({
  logs,
  hasSecondary,
}: GetStaminaEfficiencyMultiplierFromLogsOpts): StaminaEfficiencyCounter => {
  const durationCounter: StaminaEfficiencyCounter = {
    awake: 0,
    sleep1: 0,
    sleep2: 0,
    average: 0,
  };
  const weightedDurationCounter: StaminaEfficiencyCounter = {
    awake: 0,
    sleep1: 0,
    sleep2: 0,
    average: 0,
  };

  let isAsleep = false;
  let isAnySleepCounted = false;

  for (let i = 1; i < logs.length; i++) {
    const prev = logs[i - 1];
    const curr = logs[i];

    const blockEfficiency = getEfficiency({stamina: prev.stamina.after});
    const durationOfLog = curr.timing - prev.timing;

    const weightedDuration = blockEfficiency * durationOfLog;

    durationCounter.average += durationOfLog;
    weightedDurationCounter.average += weightedDuration;
    if (isAsleep) {
      if (hasSecondary && !isAnySleepCounted) {
        durationCounter.sleep2 += durationOfLog;
        weightedDurationCounter.sleep2 += weightedDuration;
      } else {
        durationCounter.sleep1 += durationOfLog;
        weightedDurationCounter.sleep1 += weightedDuration;
      }
    } else {
      durationCounter.awake += durationOfLog;
      weightedDurationCounter.awake += weightedDuration;
    }

    if (curr.type === 'sleep') {
      isAsleep = true;
    } else if (isAsleep && curr.type === 'wakeup') {
      isAsleep = false;
      isAnySleepCounted = true;
    }
  }

  return {
    sleep1: weightedDurationCounter.sleep1 / durationCounter.sleep1,
    sleep2: weightedDurationCounter.sleep2 / durationCounter.sleep2,
    awake: weightedDurationCounter.awake / durationCounter.awake,
    average: weightedDurationCounter.average / durationCounter.average,
  };
};

export const getStaminaEfficiency = (opts: GetStaminaEventLogOpts): StaminaEfficiency => {
  const {sessionInfo} = opts;

  const hasSecondary = !!sessionInfo.session.secondary;

  const logs = getStaminaEventLogs(opts);
  const staminaEfficiencyMultiplier = getStaminaEfficiencyMultiplierFromLogs({logs, hasSecondary});

  return {
    logs,
    multiplier: staminaEfficiencyMultiplier,
    intervalsDuringSleep: extractIntervalsDuringSleep({logs, hasSecondary}),
  };
};
