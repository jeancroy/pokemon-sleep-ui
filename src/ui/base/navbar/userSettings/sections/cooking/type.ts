import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {CalculatedCookingSettingsRequiredData} from '@/types/userData/settings/cooking/calculated';
import {UserCookingSettings} from '@/types/userData/settings/cooking/settings';


export type UserSettingsCookingDataProps = CalculatedCookingSettingsRequiredData & {
  recipeLevelData: RecipeLevelData[],
  mealTypes: MealTypeId[],
  ingredientIds: IngredientId[],
};

export type UserSettingsCookingCommonProps = UserSettingsCookingDataProps & {
  cookingSettings: UserCookingSettings,
  setCookingSettings: (updated: Partial<UserCookingSettings>) => void,
};
