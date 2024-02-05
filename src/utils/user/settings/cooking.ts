import {MealId} from '@/types/game/meal/main';
import {CookingUserSettings, CookingUserSettingsRequiredData} from '@/types/userData/settings/cooking';
import {UserSettingsBundle} from '@/types/userData/settings/main';
import {toTargetMeals} from '@/utils/user/settings/utils';


export type ToCookingUserSettingsOpts =
  Pick<UserSettingsBundle, 'cooking'> &
  Pick<CookingUserSettingsRequiredData, 'mealMap'>;

export const toCookingUserSettings = ({
  cooking,
  mealMap,
}: ToCookingUserSettingsOpts): CookingUserSettings => {
  return {
    recipeLevel: cooking.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: cooking.mealType,
      target: cooking.target,
      mealMap,
    }),
  };
};

type GetRecipeLevelFromCookingSettingsOpts = {
  cookingSettings: CookingUserSettings,
  mealId: MealId,
};

export const getRecipeLevelFromCookingSettings = ({
  cookingSettings,
  mealId,
}: GetRecipeLevelFromCookingSettingsOpts): number => {
  const {overrideRecipeLevel, recipeLevel} = cookingSettings;

  return overrideRecipeLevel ?? recipeLevel[mealId] ?? 1;
};
