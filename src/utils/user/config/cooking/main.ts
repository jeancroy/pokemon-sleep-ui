import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {CalculatedCookingConfigRequiredData} from '@/types/userData/config/data';
import {toActualPotCapacity} from '@/utils/user/config/cooking/potCapacity';
import {toTargetMeals} from '@/utils/user/config/cooking/targetMeals';


export type ToCalculatedCookingConfigOpts = ConfigBundle & Pick<CalculatedCookingConfigRequiredData, 'mealMap'>;

export const toCalculatedCookingConfig = ({
  userConfig,
  cookingConfig,
  mealMap,
}: ToCalculatedCookingConfigOpts): CalculatedCookingConfig => {
  return {
    recipeLevel: cookingConfig.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: cookingConfig.mealType,
      target: cookingConfig.target,
      mealMap,
    }),
    actualPotCapacity: toActualPotCapacity({baseCapacity: cookingConfig.potCapacity, userConfig}),
  };
};
