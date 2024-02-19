import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {IngredientCounter} from '@/types/game/ingredient';
import {MealCounter, MealTypeId} from '@/types/game/meal/main';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
import {CookingCommonFilter, CookingServerDataProps} from '@/ui/cooking/common/type';


export type MealPreparerIngredientStats = {
  missing: IngredientCounter,
  filler: IngredientCounter,
  required: IngredientCounter,
};

export type MealPreparerFilter = CookingCommonFilter & {
  mealsWanted: MealCounter,
  showRecipeStrength: boolean,
};

export type MealPreparerCommonProps =
  FilterWithUpdaterProps<MealPreparerFilter> &
  Omit<CookingServerDataProps, 'preloaded'> & {
    mealTypes: MealTypeId[],
    maxRecipeLevel: number,
    calculatedSettings: CalculatedUserConfig,
    preloaded: CookingConfig,
  };
