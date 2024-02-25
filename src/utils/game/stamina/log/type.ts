import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {Nullable} from '@/utils/type';


export type GetStaminaEventLogOpts = {
  config: StaminaCalcConfig,
  cookingRecoveryData: StaminaCookingRecoveryData[],
  sleepSessionInfo: SleepSessionInfo,
  skillRecoveryOverride?: Nullable<StaminaSkillTriggerData[]>,
};
