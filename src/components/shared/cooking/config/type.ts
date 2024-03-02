import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {CookingConfig} from '@/types/userData/config/cooking/main';


export type CookingConfigDataProps = {
  mealTypes: MealTypeId[],
  ingredientIds: IngredientId[],
};

export type CookingConfigUiCommonProps = CookingConfigDataProps & {
  cookingConfig: CookingConfig,
  setCookingConfig: (updated: Partial<CookingConfig>) => void,
};
