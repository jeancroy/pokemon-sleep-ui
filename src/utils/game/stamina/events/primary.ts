import {staminaStartingDefault} from '@/const/game/stamina';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaSkillRecoveryConfig} from '@/types/game/stamina/skill';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {getFinalRecoveryRate, getTotalDailyRecoveryAmount} from '@/utils/game/stamina/events/utils';


type GetLogsWithPrimarySleepOpts = Omit<GetLogsCommonOpts, 'logs'> & {
  skillRecovery: StaminaSkillRecoveryConfig,
};

const getInitialSkillRecoveryAmount = ({
  recoveryRate,
  skillTriggers,
  skillRecovery,
}: GetLogsWithPrimarySleepOpts): number => {
  const {strategy} = skillRecovery;

  if (strategy === 'conservative') {
    return 0;
  }

  return getTotalDailyRecoveryAmount({skillTriggers, recoveryRate});
};

const getIntradaySkillRecoveryAmount = ({
  recoveryRate,
  skillTriggers,
  skillRecovery,
}: GetLogsWithPrimarySleepOpts): number => {
  const {strategy} = skillRecovery;

  if (strategy === 'optimistic') {
    return 0;
  }

  return getTotalDailyRecoveryAmount({skillTriggers, recoveryRate});
};

const getWakeupStamina = (opts: GetLogsWithPrimarySleepOpts) => {
  const {
    recoveryRate,
    sessionInfo,
    skillRecovery,
  } = opts;
  const {stamina} = sessionInfo;
  const {strategy} = skillRecovery;

  const wakeupStaminaOriginal = staminaStartingDefault + getInitialSkillRecoveryAmount(opts);

  const lossInIteration = Math.max(
    0,
    stamina.dailyLoss -
    Math.floor(wakeupStaminaOriginal * getFinalRecoveryRate({recoveryRate, isSleep: false})),
  );

  if (strategy === 'conservative') {
    // Only needed if `conservative` because `getInitialSkillRecoveryAmount()` includes this already if `optimistic`
    const gainInIteration = getIntradaySkillRecoveryAmount(opts);

    // Conservative should cap the start at 100
    return Math.min(
      staminaStartingDefault,
      wakeupStaminaOriginal - lossInIteration + gainInIteration,
    );
  }

  return wakeupStaminaOriginal - lossInIteration;
};

export const getLogsWithPrimarySleep = (opts: GetLogsWithPrimarySleepOpts): StaminaEventLog[] => {
  const {sessionInfo} = opts;
  const {session, duration} = sessionInfo;
  const {primary} = session;

  const wakeupStamina = getWakeupStamina(opts);
  const sleepStamina = getStaminaAfterDuration({
    start: wakeupStamina,
    duration: duration.awake,
  });

  return [
    {
      type: 'wakeup',
      timing: primary.adjustedTiming.end,
      stamina: {
        before: sleepStamina.inGame,
        after: wakeupStamina,
      },
      staminaUnderlying: {
        before: sleepStamina.actual,
        after: wakeupStamina,
      },
    },
    {
      type: 'sleep',
      timing: primary.adjustedTiming.start,
      stamina: {
        before: sleepStamina.inGame,
        after: sleepStamina.inGame,
      },
      staminaUnderlying: {
        before: sleepStamina.actual,
        after: sleepStamina.actual,
      },
    },
  ];
};
