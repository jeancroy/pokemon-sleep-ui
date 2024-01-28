import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaRecovery, StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillRecoveryConfig, StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getLogsWithStaminaRecovery} from '@/utils/game/stamina/events/recovery';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {getActualRecoveryAmount} from '@/utils/game/stamina/events/utils';
import {generateDecimalsAndOnes} from '@/utils/number/generator';


type GetSkillRecoveryOpts = {
  skillRecovery: StaminaSkillRecoveryConfig,
};

type GetSkillStaminaRecoveryOpts = GetSkillRecoveryOpts & {
  skillTrigger: StaminaSkillTriggerData,
  secondarySession: SleepSessionInfo['session']['secondary'],
  awakeDuration: number,
  recoveryRate: StaminaRecoveryRateConfig,
};

export const getSkillStaminaRecovery = ({
  skillRecovery,
  skillTrigger,
  secondarySession,
  awakeDuration,
  recoveryRate,
}: GetSkillStaminaRecoveryOpts): StaminaRecovery[] => {
  if (skillRecovery.strategy !== 'conservative') {
    return [];
  }

  const {dailyCount, amount} = skillTrigger;

  return [...generateDecimalsAndOnes(dailyCount)].map((weight, idx): StaminaRecovery => {
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
  ...opts
}: GetLogsWithSkillRecoveryOfTriggerOpts): StaminaEventLog[] => {
  const {session, duration} = sessionInfo;
  const {secondary} = session;

  return getLogsWithStaminaRecovery({
    logs,
    recoveries: getSkillStaminaRecovery({
      ...opts,
      secondarySession: secondary,
      awakeDuration: duration.awake,
    }),
    recoveryEventType: 'skillRecovery',
  });
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
