import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {CalculatedCookingConfigRequiredData} from '@/types/userData/config/data';


export type UserSettingsCookingDataProps = CalculatedCookingConfigRequiredData & {
  recipeLevelData: RecipeLevelData[],
  mealTypes: MealTypeId[],
  ingredientIds: IngredientId[],
};

export type UserSettingsCookingCommonProps = UserSettingsCookingDataProps & {
  cookingSettings: CookingConfig,
  setCookingSettings: (updated: Partial<CookingConfig>) => void,
};
