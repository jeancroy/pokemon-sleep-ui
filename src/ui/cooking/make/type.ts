import {FilterInclusionMap, FilterWithUpdaterProps} from '@/components/input/filter/type';
import {IngredientId} from '@/types/game/ingredient';
import {MealStrengthInfo} from '@/types/game/meal/info';
import {Meal, MealTypeId} from '@/types/game/meal/main';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {CookingCommonFilter} from '@/ui/cooking/common/type';
import {MealMakerPopupCommonProps} from '@/ui/cooking/make/recipe/popup/type';


export type MealMakerRecipeData = {
  meal: Meal,
  info: MealStrengthInfo,
};

export type MealMakerFilter = CookingCommonFilter & {
  type: MealTypeId | null,
  capacity: number,
  ingredient: FilterInclusionMap<IngredientId>,
  showUnmakeableRecipe: boolean,
};

export type MealMakerCommonProps = FilterWithUpdaterProps<MealMakerFilter> & MealMakerPopupCommonProps & {
  meals: Meal[],
  mealTypes: MealTypeId[],
  preloaded: CookingConfig,
};
