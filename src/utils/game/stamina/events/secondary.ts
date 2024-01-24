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

  const staminaAtSleepStart = getStaminaAfterDuration({
    start: newLogs[0].stamina.after,
    duration: secondary.adjustedTiming.start,
  });
  const staminaAtSleepEndInGame = getStaminaAfterDuration({
    start: staminaAtSleepStart.inGame,
    duration: secondary.length,
  });
  const staminaAtSleepEndActual = getStaminaAfterDuration({
    start: staminaAtSleepStart.actual,
    duration: secondary.length,
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
        before: staminaAtSleepStart.inGame,
        after: staminaAtSleepStart.inGame,
      },
      staminaUnderlying: {
        before: staminaAtSleepStart.actual,
        after: staminaAtSleepStart.actual,
      },
    },
    {
      type: 'wakeup',
      timing: secondary.adjustedTiming.end,
      stamina: {
        before: staminaAtSleepEndInGame.inGame,
        after: staminaAtSleepEndInGame.inGame + recovery,
      },
      staminaUnderlying: {
        before: staminaAtSleepEndActual.actual,
        after: staminaAtSleepEndActual.actual + recovery,
      },
    },
  );

  newLogs.push(generateSleepEventFromLast({newLogs, sleepLog: logs[logs.length - 1]}));

  return newLogs;
};
