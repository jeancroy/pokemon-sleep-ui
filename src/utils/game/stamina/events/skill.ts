import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaRecovery} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getLogsWithStaminaRecovery} from '@/utils/game/stamina/events/recovery';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {generateDecimalsAndOnes} from '@/utils/number/generator';


type GetSkillRecoveryOpts = Pick<GetLogsCommonOpts, 'general'>;

type GetSkillStaminaRecoveryOpts = GetSkillRecoveryOpts & {
  skillTrigger: StaminaSkillTriggerData,
  secondarySession: SleepSessionInfo['session']['secondary'],
  awakeDuration: number,
};

export const getSkillStaminaRecovery = ({
  general,
  skillTrigger,
  secondarySession,
  awakeDuration,
}: GetSkillStaminaRecoveryOpts): StaminaRecovery[] => {
  if (general.strategy !== 'conservative') {
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
      getBaseAmount: () => amount * weight,
    };
  });
};

type GetLogsWithSkillRecoveryOfTriggerOpts = Omit<GetLogsWithSkillRecoveryOpts, 'skillTriggers'> & {
  skillTrigger: StaminaSkillTriggerData,
};

export const getLogsWithSkillRecoveryOfTrigger = ({
  sleepSessionInfo,
  logs,
  ...opts
}: GetLogsWithSkillRecoveryOfTriggerOpts): StaminaEventLog[] => {
  const {recoveryRate} = opts;
  const {session, duration} = sleepSessionInfo;
  const {secondary} = session;

  return getLogsWithStaminaRecovery({
    logs,
    recoveries: getSkillStaminaRecovery({
      ...opts,
      secondarySession: secondary,
      awakeDuration: duration.awake,
    }),
    recoveryRate,
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
    general,
  } = opts;
  const {strategy} = general;

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
