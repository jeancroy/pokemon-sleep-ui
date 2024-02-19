import {UserCookingSettings} from '@/types/userData/settings/cooking/settings';
import {NonNullableRecord} from '@/utils/type';


export const defaultUserCookingSettings: NonNullableRecord<UserCookingSettings> = {
  mealType: 1,
  target: {
    1: {
      breakfast: 1005,
      lunch: 1005,
      dinner: 1005,
    },
    2: {
      breakfast: 2011,
      lunch: 2011,
      dinner: 2011,
    },
    3: {
      breakfast: 3007,
      lunch: 3007,
      dinner: 3007,
    },
  },
  potCapacity: 15,
  ingredients: {},
  unlockedIngredients: {
    3: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: true,
    15: true,
  },
  showEnergy: true,
  showUnmakeableRecipe: true,
  ingredientCount: {},
  recipeLevel: {},
  mealsWanted: {},
  mealsMarked: {},
};
