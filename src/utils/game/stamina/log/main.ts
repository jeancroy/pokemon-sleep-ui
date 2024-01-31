import {StaminaEventLog} from '@/types/game/stamina/event';
import {getLogsWithEfficiencyBlock} from '@/utils/game/stamina/events/block';
import {getStaminaEventLogsCommon} from '@/utils/game/stamina/log/common';
import {getDailyNetChangeFromStaminaEventLogs} from '@/utils/game/stamina/log/dailyNetChange';
import {GetStaminaEventLogOpts} from '@/utils/game/stamina/log/type';


export const getStaminaEventLogs = (opts: GetStaminaEventLogOpts): StaminaEventLog[] => {
  const dailyNetChange = getDailyNetChangeFromStaminaEventLogs(opts);

  const logs = getStaminaEventLogsCommon({
    ...opts,
    dailyNetChange,
  });

  return getLogsWithEfficiencyBlock({logs});
};
