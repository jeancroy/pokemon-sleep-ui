import {CookingUserSettings, CookingUserSettingsRequiredData} from '@/types/userData/settings/cooking';
import {UserSettingsBundle} from '@/types/userData/settings/main';
import {toActualPotCapacity} from '@/utils/user/settings/cooking/potCapacity';
import {toTargetMeals} from '@/utils/user/settings/utils';


export type ToCookingUserSettingsOpts = UserSettingsBundle & Pick<CookingUserSettingsRequiredData, 'mealMap'>;

export const toCookingUserSettings = ({
  settings,
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
    actualPotCapacity: toActualPotCapacity({baseCapacity: cooking.potCapacity, settings}),
  };
};

