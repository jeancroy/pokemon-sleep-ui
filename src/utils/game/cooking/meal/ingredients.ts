import {IngredientCounter, IngredientId} from '@/types/game/ingredient';
import {MealIngredient} from '@/types/game/meal/main';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';
import {isNotNullish} from '@/utils/type';


export const toMealIngredientFromIngredientCounter = (ingredientCount: IngredientCounter): MealIngredient[] => {
  return Object.entries(ingredientCount)
    .map(([id, quantity]) => {
      if (!quantity) {
        return null;
      }

      return {id: parseInt(id), quantity};
    })
    .filter(isNotNullish);
};

export const toProducingItemFromIngredientCounter = (
  ingredientCount: IngredientCounter,
): PokemonProducingItem<IngredientId>[] => {
  return Object.entries(ingredientCount)
    .map(([id, qty]) => {
      if (!qty) {
        return null;
      }

      return {id: parseInt(id), qty};
    })
    .filter(isNotNullish);
};

export const toIngredientCounterFromMealIngredient = (ingredients: MealIngredient[]): IngredientCounter => (
  Object.fromEntries(ingredients.map(({id, quantity}) => [id, quantity]))
);

export const getMealIngredientsRequiredCommon = (counters: IngredientCounter[]): IngredientCounter => {
  if (!counters.length) {
    return {};
  }

  const ret: IngredientCounter = {...counters[0]};

  for (const counter of counters.slice(1)) {
    for (const [id, count] of Object.entries(counter)) {
      const ingredientId = parseInt(id);

      ret[ingredientId] = Math.max(ret[ingredientId] ?? 0, count ?? 0);
    }
  }

  return ret;
};
