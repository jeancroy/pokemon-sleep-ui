import {
  CalculatedCookingSettings,
  CalculatedCookingSettingsRequiredData,
} from '@/types/userData/settings/cooking/calculated';
import {UserSettingsBundle} from '@/types/userData/settings/main';
import {toActualPotCapacity} from '@/utils/user/settings/cooking/potCapacity';
import {toTargetMeals} from '@/utils/user/settings/utils';


export type ToCalculatedCookingSettingsOpts =
  UserSettingsBundle &
  Pick<CalculatedCookingSettingsRequiredData, 'mealMap'>;

export const toCalculatedCookingSettings = ({
  settings,
  cooking,
  mealMap,
}: ToCalculatedCookingSettingsOpts): CalculatedCookingSettings => {
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

