import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap, PokemonIngredientProduction} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {CalculatedConfigBundle, ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type PokemonItemStatsWorkerOpts = ConfigRequiredData & {
  input: PokemonIndividualParams,
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  pokemonIngredientProduction: PokemonIngredientProduction[],
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  recipeLevelData: RecipeLevelData[],
  bundle: ConfigBundle,
  calculatedConfigBundle: CalculatedConfigBundle,
};
