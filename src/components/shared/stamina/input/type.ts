import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {ConfigBundle} from '@/types/userData/config/bundle';


export type StaminaConfigProps = {
  bundle: ConfigBundle,
  setStaminaConfig: (updated: StaminaCalcConfig) => void,
  setStaminaSkillTrigger: (updated: StaminaSkillTriggerData) => void,
  hideManualSkillRecovery?: boolean,
};
