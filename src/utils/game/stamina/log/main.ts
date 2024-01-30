import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getLogsWithEfficiencyBlock} from '@/utils/game/stamina/events/block';
import {getLogsWithCookingRecovery} from '@/utils/game/stamina/events/cooking';
import {getLogsWithEndOfPeriodMark} from '@/utils/game/stamina/events/endOfPeriod';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';


export type GetStaminaEventLogOpts = {
  config: StaminaCalcConfig,
  cookingRecoveryData: StaminaCookingRecoveryData[],
  sleepSessionInfo: SleepSessionInfo,
  additionalSkillTriggers?: StaminaSkillTriggerData[],
};

export const getStaminaEventLogs = ({
  config,
  cookingRecoveryData,
  sleepSessionInfo,
  additionalSkillTriggers,
}: GetStaminaEventLogOpts): StaminaEventLog[] => {
  const {cookingRecovery, skillRecovery} = config;

  const skillTriggers: StaminaSkillTriggerData[] = [
    skillRecovery.recovery,
    ...(additionalSkillTriggers ?? []),
  ];

  let logs = getLogsWithPrimarySleep({
    sleepSessionInfo,
    skillTriggers,
    cookingRecoveryData,
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
  logs = getLogsWithEfficiencyBlock({logs});

  return logs;
};
