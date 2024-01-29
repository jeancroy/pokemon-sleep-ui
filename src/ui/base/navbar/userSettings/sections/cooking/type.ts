import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {UserCookingPreset} from '@/types/userData/cooking';
import {CookingUserSettingsRequiredData} from '@/types/userData/settings';


export type UserSettingsCookingDataProps = CookingUserSettingsRequiredData & {
  mealTypes: MealTypeId[],
  ingredientIds: IngredientId[],
};

export type UserSettingsCookingCommonProps = UserSettingsCookingDataProps & {
  cookingPreset: UserCookingPreset,
  setCookingPreset: (updated: Partial<UserCookingPreset>) => void,
};
