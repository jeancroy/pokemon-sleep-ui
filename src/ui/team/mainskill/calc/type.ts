import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type GetSkillTriggerAnalysisCalcUnitCommonOpts = ConfigRequiredData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  recipeLevelData: RecipeLevelData[],
  calculatedConfigBundle: CalculatedConfigBundle,
};
