import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';


export type GetLogsCommonOpts = {
  sessionInfo: SleepSessionInfo,
  logs: StaminaEventLog[],
  recoveryRate: StaminaRecoveryRateConfig,
  skillTriggers: StaminaSkillTriggerData[],
};
