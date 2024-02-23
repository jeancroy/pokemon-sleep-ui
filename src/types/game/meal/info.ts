import {IngredientCounter, IngredientOfMeals} from '@/types/game/ingredient';
import {MealStrengthBonusMultiplier} from '@/utils/game/meal/strength/type';


export type MealInfo = MealStrengthBonusMultiplier & {
  bonus: {
    level: number,
    rarity: number,
    total: number,
  },
};

export type MealStrengthInfo = MealInfo & {
  level: number,
  strengthFinal: number,
};

export type MealIngredientInfo = {
  ingredientsRequired: IngredientCounter,
  ingredientOfMeals: IngredientOfMeals,
};
