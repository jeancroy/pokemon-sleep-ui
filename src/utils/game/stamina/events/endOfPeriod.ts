import {durationOfDay} from '@/const/common';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';


export const getLogsWithEndOfPeriodMark = ({
  logs,
}: Pick<GetLogsCommonOpts, 'logs'>): StaminaEventLog[] => {
  const newLogs: StaminaEventLog[] = [...logs];

  const last = logs[logs.length - 1];
  const staminaAfter = getStaminaAfterDuration({
    start: last.stamina.after,
    duration: durationOfDay - last.timing,
  });
  const staminaAfterUnderlying = getStaminaAfterDuration({
    start: last.staminaUnderlying.after,
    duration: durationOfDay - last.timing,
  });

  newLogs.push(
    {
      type: 'endOfPeriod',
      timing: durationOfDay,
      stamina: {
        before: staminaAfter.inGame,
        after: staminaAfter.actual,
      },
      staminaUnderlying: {
        before: staminaAfterUnderlying.inGame,
        after: staminaAfterUnderlying.actual,
      },
    },
  );

  return newLogs;
};
