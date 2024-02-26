import {staminaMaxRecovery} from '@/const/game/stamina';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';
import {toSum} from '@/utils/array';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {getActualRecoveryAmount} from '@/utils/game/stamina/events/utils';


type GetLogsWithPrimarySleepOpts = Omit<GetLogsCommonOpts, 'logs'> & {
  cookingRecoveryData: StaminaCookingRecoveryData[],
  dailyNetChange?: number,
};

const getInitialRecovery = ({
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

export const getWakeupStamina = (opts: GetLogsWithPrimarySleepOpts) => {
  const {sleepSessionInfo, dailyNetChange} = opts;

  const sleepRecovery = sleepSessionInfo.session.primary.recovery;

  const initialRecovery = getInitialRecovery(opts);

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
