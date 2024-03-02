import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {IngredientCounter} from '@/types/game/ingredient';
import {MealCounter, MealTypeId} from '@/types/game/meal/main';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
import {CommonServerDataCollection} from '@/types/website/data/common';
import {CookingCommonFilter} from '@/ui/cooking/common/type';


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
  Pick<
    CommonServerDataCollection,
    'ingredientMap' |
    'recipeLevelData'
  > & {
    mealTypes: MealTypeId[],
    maxRecipeLevel: number,
    calculatedUserConfig: CalculatedUserConfig,
    preloaded: CookingConfig,
  };
