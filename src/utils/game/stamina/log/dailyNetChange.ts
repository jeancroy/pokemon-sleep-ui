import {getStaminaEventLogsCommon} from '@/utils/game/stamina/log/common';
import {GetStaminaEventLogOpts} from '@/utils/game/stamina/log/type';


export const getDailyNetChangeFromStaminaEventLogs = (opts: GetStaminaEventLogOpts): number => {
  const lastLog = getStaminaEventLogsCommon(opts).at(-1);

  if (!lastLog) {
    throw new Error('Should have some logs for getting daily net change');
  }

  if (lastLog.type !== 'endOfPeriod') {
    throw new Error(
      `The last stamina log for getting daily net change should be [endOfPeriod] (${lastLog.type})`,
    );
  }

  return lastLog.staminaUnderlying.after;
};
