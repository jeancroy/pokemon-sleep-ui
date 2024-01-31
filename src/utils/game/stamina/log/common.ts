import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getLogsWithCookingRecovery} from '@/utils/game/stamina/events/cooking';
import {getLogsWithEndOfPeriodMark} from '@/utils/game/stamina/events/endOfPeriod';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';
import {GetStaminaEventLogOpts} from '@/utils/game/stamina/log/type';


type GetStaminaEventLogCommonOpts = GetStaminaEventLogOpts & {
  dailyNetChange?: number,
};

export const getStaminaEventLogsCommon = ({
  config,
  cookingRecoveryData,
  sleepSessionInfo,
  additionalSkillTriggers,
  dailyNetChange,
}: GetStaminaEventLogCommonOpts): StaminaEventLog[] => {
  const {cookingRecovery, skillRecovery} = config;

  const skillTriggers: StaminaSkillTriggerData[] = [
    skillRecovery.recovery,
    ...(additionalSkillTriggers ?? []),
  ];

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
