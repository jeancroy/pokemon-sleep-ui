import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {ConfigBundle} from '@/types/userData/config/bundle';


export type StaminaAnalysisState = {
  bundle: ConfigBundle,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export type UseStaminaAnalysisReturn = {
  state: StaminaAnalysisState,
  setConfig: (updated: StaminaCalcConfig) => void,
  setSkillTrigger: (updated: StaminaSkillTriggerData) => void,
  setSubSkill: (updated: PokemonSubSkill) => void,
  setNature: (updated: NatureId | null) => void,
};
