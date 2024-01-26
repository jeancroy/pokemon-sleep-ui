import {staminaAbsoluteMax} from '@/const/game/stamina';
import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaSkillRecoveryConfig, StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts, StaminaSkillRecoveryData} from '@/utils/game/stamina/events/type';
import {
  getActualRecoveryAmount,
  offsetEventLogStamina,
  updateLogStaminaFromLast,
} from '@/utils/game/stamina/events/utils';
import {generateDecimalsAndOnes} from '@/utils/number/generator';


type GetSkillRecoveryOpts = {
  skillRecovery: StaminaSkillRecoveryConfig,
};

type GetSkillRecoveryDataOpts = GetSkillRecoveryOpts & {
  skillTrigger: StaminaSkillTriggerData,
  secondarySession: SleepSessionInfo['session']['secondary'],
  awakeDuration: number,
  recoveryRate: StaminaRecoveryRateConfig,
};

export const getSkillRecoveryData = ({
  skillRecovery,
  skillTrigger,
  secondarySession,
  awakeDuration,
  recoveryRate,
}: GetSkillRecoveryDataOpts): StaminaSkillRecoveryData[] => {
  if (skillRecovery.strategy !== 'conservative') {
    return [];
  }

  const {dailyCount, amount} = skillTrigger;

  return [...generateDecimalsAndOnes(dailyCount)].map((weight, idx): StaminaSkillRecoveryData => {
    let expectedTiming = awakeDuration * (idx + 1) / (Math.max(1, Math.floor(dailyCount)) + 1);

    if (secondarySession && expectedTiming > secondarySession.adjustedTiming.start) {
      expectedTiming += secondarySession.duration.actual;
    }

    return {
      timing: expectedTiming,
      amount: getActualRecoveryAmount({amount: amount * weight, recoveryRate, isSleep: false}),
    };
  });
};

type GetLogsWithSkillRecoveryOfTriggerOpts = Omit<GetLogsWithSkillRecoveryOpts, 'skillTriggers'> & {
  skillTrigger: StaminaSkillTriggerData,
};

export const getLogsWithSkillRecoveryOfTrigger = ({
  sessionInfo,
  logs,
  recoveryRate,
  skillTrigger,
  ...opts
}: GetLogsWithSkillRecoveryOfTriggerOpts): StaminaEventLog[] => {
  const {session, duration} = sessionInfo;
  const {secondary} = session;
  const {amount} = skillTrigger;

  const newLogs: StaminaEventLog[] = [logs[0]];

  const skillRecoveries = getSkillRecoveryData({
    ...opts,
    skillTrigger,
    secondarySession: secondary,
    awakeDuration: duration.awake,
    recoveryRate,
  });
  let skillUsedCount = 0;

  for (const log of logs.slice(1)) {
    let recoveryData = skillRecoveries.at(skillUsedCount);

    while (recoveryData && log.timing >= recoveryData.timing) {
      const latest = newLogs[newLogs.length - 1];
      const staminaBefore = getStaminaAfterDuration({
        start: latest.stamina.after,
        duration: recoveryData.timing - latest.timing,
      });

      newLogs.push({
        type: 'skillRecovery',
        timing: recoveryData.timing,
        stamina: {
          before: staminaBefore.inGame,
          after: Math.min(staminaBefore.inGame + recoveryData.amount, staminaAbsoluteMax),
        },
        staminaUnderlying: {
          before: staminaBefore.inGame,
          after: Math.min(staminaBefore.inGame + recoveryData.amount, staminaAbsoluteMax),
        },
      });
      skillUsedCount += 1;
      recoveryData = skillRecoveries.at(skillUsedCount);
    }

    // Using indexer to guarantee the last log is returned
    // This shouldn't fail because `newLogs` already have something inside at the beginning
    const lastLog = newLogs[newLogs.length - 1];

    if (!skillUsedCount || lastLog.type !== 'skillRecovery') {
      newLogs.push(offsetEventLogStamina({
        log,
        offset: skillUsedCount * getActualRecoveryAmount({amount, recoveryRate, isSleep: false}),
      }));
      continue;
    }

    newLogs.push(updateLogStaminaFromLast({
      source: log,
      last: lastLog,
    }));
  }

  return newLogs;
};

type GetLogsWithSkillRecoveryOpts = GetLogsCommonOpts & GetSkillRecoveryOpts;

export const getLogsWithSkillRecovery = ({
  skillTriggers,
  ...opts
}: GetLogsWithSkillRecoveryOpts): StaminaEventLog[] => {
  const {
    logs,
    skillRecovery,
  } = opts;

  const {strategy} = skillRecovery;

  if (strategy !== 'conservative') {
    return [...logs];
  }

  let newLogs: StaminaEventLog[] = [logs[0]];

  for (const skillTrigger of skillTriggers) {
    newLogs = getLogsWithSkillRecoveryOfTrigger({
      ...opts,
      logs: newLogs.length === 1 ? logs : newLogs,
      skillTrigger,
    });
  }

  return newLogs;
};
