import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';


export type StaminaConfigProps = {
  cookingRecoveryData: StaminaCookingRecoveryData[],
  config: StaminaCalcConfig,
  setConfig: (updated: StaminaCalcConfig) => void,
  setTrigger: (updated: StaminaSkillTriggerData) => void,
};
