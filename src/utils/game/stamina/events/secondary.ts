import {StaminaEventLog} from '@/types/game/stamina/event';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {generateSleepEventFromLast, getActualRecoveryAmount} from '@/utils/game/stamina/events/utils';


export const getLogsWithSecondarySleep = ({
  sessionInfo,
  logs,
  recoveryRate,
}: Omit<GetLogsCommonOpts, 'skillTriggers'>): StaminaEventLog[] => {
  const {session} = sessionInfo;
  const {secondary} = session;

  if (!secondary) {
    return [...logs];
  }

  const newLogs: StaminaEventLog[] = [logs[0]];

  const sleepStamina = getStaminaAfterDuration({
    start: newLogs[0].stamina.after,
    duration: secondary.adjustedTiming.start,
  });
  const recovery = getActualRecoveryAmount({
    amount: secondary.recovery,
    recoveryRate,
    isSleep: true,
  });

  newLogs.push(
    {
      type: 'sleep',
      timing: secondary.adjustedTiming.start,
      stamina: {
        before: sleepStamina.inGame,
        after: sleepStamina.inGame + recovery,
      },
      staminaUnderlying: {
        before: sleepStamina.actual,
        after: sleepStamina.actual + recovery,
      },
    },
    {
      type: 'wakeup',
      timing: secondary.adjustedTiming.end,
      stamina: {
        before: sleepStamina.inGame,
        after: sleepStamina.inGame + recovery,
      },
      staminaUnderlying: {
        before: sleepStamina.actual,
        after: sleepStamina.actual + recovery,
      },
    },
  );

  newLogs.push(generateSleepEventFromLast({newLogs, sleepLog: logs[logs.length - 1]}));

  return newLogs;
};
