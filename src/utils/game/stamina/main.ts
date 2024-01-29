import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaEfficiency, StaminaEfficiencyCounter} from '@/types/game/stamina/efficiency';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getEfficiency} from '@/utils/game/stamina/efficiency';
import {getLogsWithEfficiencyBlock} from '@/utils/game/stamina/events/block';
import {getLogsWithCookingRecovery} from '@/utils/game/stamina/events/cooking';
import {getLogsWithEndOfPeriodMark} from '@/utils/game/stamina/events/endOfPeriod';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';
import {extractIntervalsDuringSleep} from '@/utils/game/stamina/interval';


type GetStaminaEventLogOpts = {
  config: StaminaCalcConfig,
  cookingRecoveryData: StaminaCookingRecoveryData[],
  sleepSessionInfo: SleepSessionInfo,
  additionalSkillTriggers?: StaminaSkillTriggerData[],
};

const getStaminaEventLogs = ({
  config,
  cookingRecoveryData,
  sleepSessionInfo,
  additionalSkillTriggers,
}: GetStaminaEventLogOpts): StaminaEventLog[] => {
  const {cookingRecovery, recoveryRate, skillRecovery} = config;

  const skillTriggers: StaminaSkillTriggerData[] = [
    skillRecovery.recovery,
    ...(additionalSkillTriggers ?? []),
  ];

  let logs = getLogsWithPrimarySleep({sleepSessionInfo, skillTriggers, ...config});
  logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, ...config});
  logs = getLogsWithSkillRecovery({logs, sleepSessionInfo, skillTriggers, ...config});
  logs = getLogsWithCookingRecovery({
    logs,
    sleepSessionInfo,
    recoveryRate,
    cookingRecoveryData,
    cookingRecoveryConfig: cookingRecovery,
  });
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
}: GetStaminaEfficiencyMultiplierFromLogsOpts): StaminaEfficiencyCounter<number | null> => {
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
    sleep2: hasSecondary ? weightedDurationCounter.sleep2 / durationCounter.sleep2 : null,
    awake: weightedDurationCounter.awake / durationCounter.awake,
    average: weightedDurationCounter.average / durationCounter.average,
  };
};

export const getStaminaEfficiency = (opts: Omit<GetStaminaEventLogOpts, 'sleepSessionInfo'>): StaminaEfficiency => {
  const {config} = opts;
  const {sleepSession, recoveryRate} = config;

  const sleepSessionInfo = getSleepSessionInfo({sleepSession, recoveryRate});
  const hasSecondary = !!sleepSessionInfo.session.secondary;

  const logs = getStaminaEventLogs({sleepSessionInfo, ...opts});
  const multiplier = getStaminaEfficiencyMultiplierFromLogs({logs, hasSecondary});

  return {
    logs,
    multiplier,
    sleepSessionInfo,
    intervalsDuringSleep: extractIntervalsDuringSleep({logs, hasSecondary}),
  };
};
