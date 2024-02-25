import {StaminaEventLog} from '@/types/game/stamina/event';
import {getLogsWithCookingRecovery} from '@/utils/game/stamina/events/cooking';
import {getLogsWithEndOfPeriodMark} from '@/utils/game/stamina/events/endOfPeriod';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';
import {getStaminaEventLogsEffectiveSkillTriggers} from '@/utils/game/stamina/log/skillTriggers';
import {GetStaminaEventLogOpts} from '@/utils/game/stamina/log/type';


type GetStaminaEventLogCommonOpts = GetStaminaEventLogOpts & {
  dailyNetChange?: number,
};

export const getStaminaEventLogsCommon = ({
  dailyNetChange,
  ...opts
}: GetStaminaEventLogCommonOpts): StaminaEventLog[] => {
  const {
    config,
    cookingRecoveryData,
    sleepSessionInfo,
  } = opts;
  const {cookingRecovery} = config;

  const skillTriggers = getStaminaEventLogsEffectiveSkillTriggers(opts);

  let logs = getLogsWithPrimarySleep({
    sleepSessionInfo,
    skillTriggers,
    cookingRecoveryData,
    dailyNetChange,
    ...config,
  });
  logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, ...config});
  logs = getLogsWithSkillRecovery({logs, sleepSessionInfo, skillTriggers, ...config});
  logs = getLogsWithCookingRecovery({
    logs,
    sleepSessionInfo,
    cookingRecoveryData,
    cookingRecoveryConfig: cookingRecovery,
    ...config,
  });
  logs = getLogsWithEndOfPeriodMark({logs});

  return logs;
};
