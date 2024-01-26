import {staminaMaxRecovery} from '@/const/game/stamina';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {generateSleepEventFromLast} from '@/utils/game/stamina/events/utils';


export const getLogsWithSecondarySleep = ({
  sessionInfo,
  logs,
}: Pick<GetLogsCommonOpts, 'sessionInfo' | 'logs'>): StaminaEventLog[] => {
  const {session} = sessionInfo;
  const {secondary} = session;

  if (!secondary) {
    return [...logs];
  }

  const newLogs: StaminaEventLog[] = [logs[0]];

  const {recovery, adjustedTiming, duration} = secondary;
  const staminaAtSleepStart = getStaminaAfterDuration({
    start: newLogs[0].stamina.after,
    duration: adjustedTiming.start,
  });
  const staminaAtSleepEndInGame = getStaminaAfterDuration({
    start: staminaAtSleepStart.inGame,
    duration: duration.actual,
  });
  const staminaAtSleepEndActual = getStaminaAfterDuration({
    start: staminaAtSleepStart.actual,
    duration: duration.actual,
  });

  newLogs.push(
    {
      type: 'sleep',
      timing: adjustedTiming.start,
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
      timing: adjustedTiming.end,
      stamina: {
        before: staminaAtSleepEndInGame.inGame,
        after: Math.min(staminaMaxRecovery, staminaAtSleepEndInGame.inGame + recovery.actual),
      },
      staminaUnderlying: {
        before: staminaAtSleepEndActual.actual,
        after: Math.min(staminaMaxRecovery, staminaAtSleepEndActual.actual + recovery.actual),
      },
    },
  );

  newLogs.push(generateSleepEventFromLast({newLogs, sleepLog: logs[logs.length - 1]}));

  return newLogs;
};
