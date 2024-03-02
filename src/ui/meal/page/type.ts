import {Meal} from '@/types/game/meal/main';
import {PokemonIngredientProductionMap} from '@/types/game/pokemon';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';


export type MealServerDataProps = {
  meal: Meal,
  pokemonIngredientProductionMap: PokemonIngredientProductionMap,
};

export type MealCommonProps = MealServerDataProps & {
  isPremium: boolean,
  calculatedConfigBundle: CalculatedConfigBundle,
};
