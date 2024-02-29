import {PokeboxImporterDataProps} from '@/components/shared/pokebox/importer/type';
import {BerryDataMap} from '@/types/game/berry';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type StaminaConfigDataProps = PokeboxImporterDataProps & ConfigRequiredData & {
  berryDataMap: BerryDataMap,
  mainSkillMap: MainSkillMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  recipeLevelData: RecipeLevelData[],
  cookingRecoveryData: StaminaCookingRecoveryData[],
};

export type StaminaConfigProps = StaminaConfigDataProps & {
  bundle: ConfigBundle,
  setStaminaConfig: (updated: StaminaCalcConfig) => void,
  setStaminaSkillTrigger: (updated: StaminaSkillTriggerData) => void,
  hideManualSkillRecovery?: boolean,
};
