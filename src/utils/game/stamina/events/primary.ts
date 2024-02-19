import {staminaMaxRecovery} from '@/const/game/stamina';
import {defaultRecoveryRate} from '@/const/user/settings';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';
import {userCookingMeals} from '@/types/userData/settings/cooking/common';
import {toSum} from '@/utils/array';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {getActualRecoveryAmount} from '@/utils/game/stamina/events/utils';


type GetLogsWithPrimarySleepOpts = Omit<GetLogsCommonOpts, 'logs'> & {
  cookingRecoveryData: StaminaCookingRecoveryData[],
  dailyNetChange?: number,
};

const getInitialSkillRecoveryAmount = ({
  general,
  recoveryRate,
  skillTriggers,
}: GetLogsWithPrimarySleepOpts): number => {
  const {strategy} = general;

  if (strategy === 'conservative') {
    return 0;
  }

  return toSum(skillTriggers.map(({dailyCount, amount}) => (
    dailyCount * getActualRecoveryAmount({amount, recoveryRate, isSleep: false})
  )));
};

const getInitialCookingRecoveryAmount = ({
  general,
  cookingRecoveryData,
}: GetLogsWithPrimarySleepOpts): number => {
  const {strategy} = general;

  if (strategy === 'conservative') {
    return 0;
  }

  const maxSingleRecovery = Math.max(...cookingRecoveryData.map(({recovery}) => recovery));

  return (
    getActualRecoveryAmount({
      amount: maxSingleRecovery,
      recoveryRate: defaultRecoveryRate,
      isSleep: false,
    }) *
    userCookingMeals.length
  );
};

export const getWakeupStamina = (opts: GetLogsWithPrimarySleepOpts) => {
  const {sleepSessionInfo, dailyNetChange} = opts;

  const sleepRecovery = sleepSessionInfo.session.primary.recovery;
  const skillRecovery = getInitialSkillRecoveryAmount(opts);
  const cookingRecovery = getInitialCookingRecoveryAmount(opts);

  const initialRecovery = skillRecovery + cookingRecovery;

  // If daily net change is positive, after infinite iterations,
  // the energy will stay at 100 after primary wakeup
  if (dailyNetChange && dailyNetChange >= 0) {
    return staminaMaxRecovery + initialRecovery;
  }

  return Math.min(sleepRecovery.actual, staminaMaxRecovery) + initialRecovery;
};

export const getLogsWithPrimarySleep = (opts: GetLogsWithPrimarySleepOpts): StaminaEventLog[] => {
  const {sleepSessionInfo} = opts;
  const {session, duration} = sleepSessionInfo;
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
        before: wakeupStamina,
        after: wakeupStamina,
      },
      staminaUnderlying: {
        before: wakeupStamina,
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
