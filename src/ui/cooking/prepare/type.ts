import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {IngredientCounter} from '@/types/game/ingredient';
import {MealCounter, MealTypeId} from '@/types/game/meal/main';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {CookingCommonFilter, CookingPreloadedData, CookingServerDataProps} from '@/ui/cooking/common/type';


export type MealPreparerIngredientStats = {
  missing: IngredientCounter,
  filler: IngredientCounter,
  required: IngredientCounter,
};

export type MealPreparerFilter = CookingCommonFilter & {
  mealsWanted: MealCounter,
};

export type MealPreparerCommonProps =
  FilterWithUpdaterProps<MealPreparerFilter> &
  Omit<CookingServerDataProps, 'preloaded'> & {
    mealTypes: MealTypeId[],
    maxRecipeLevel: number,
    calculatedSettings: CalculatedUserSettings,
    preloaded: CookingPreloadedData['cooking'],
  };
