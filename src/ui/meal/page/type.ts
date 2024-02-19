import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap, PokemonIngredientProductionMap} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {CalculatedConfigBundle, ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type MealServerDataProps = ConfigRequiredData & {
  meal: Meal,
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  pokemonIngredientProductionMap: PokemonIngredientProductionMap,
  pokemonMaxLevel: number,
  recipeLevelData: RecipeLevelData[],
  preloaded: ConfigBundle,
};

export type MealCommonProps = MealServerDataProps & {
  isPremium: boolean,
  bundle: ConfigBundle,
  calculatedConfigBundle: CalculatedConfigBundle,
};
