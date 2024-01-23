import {IngredientCounter, IngredientOfMeals} from '@/types/game/ingredient';


export type MealInfo = {
  bonus: {
    level: number,
    rarity: number,
    total: number,
  },
  strengthBase: number,
  strengthAfterRarity: number,
};

export type MealStrengthInfo = MealInfo & {
  strengthFinal: number,
};

export type MealIngredientInfo = {
  ingredientsRequired: IngredientCounter,
  ingredientOfMeals: IngredientOfMeals,
};
