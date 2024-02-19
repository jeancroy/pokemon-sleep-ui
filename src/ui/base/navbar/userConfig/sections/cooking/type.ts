import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {CalculatedCookingConfigRequiredData} from '@/types/userData/config/data';


export type UserConfigCookingDataProps = CalculatedCookingConfigRequiredData & {
  recipeLevelData: RecipeLevelData[],
  mealTypes: MealTypeId[],
  ingredientIds: IngredientId[],
};

export type UserConfigCookingCommonProps = UserConfigCookingDataProps & {
  cookingConfig: CookingConfig,
  setCookingConfig: (updated: Partial<CookingConfig>) => void,
};
