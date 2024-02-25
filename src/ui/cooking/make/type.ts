import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {MealInputFilterLevelAgnostic} from '@/components/shared/meal/filter/levelAgnostic/type';
import {MealStrengthInfo} from '@/types/game/meal/info';
import {Meal, MealTypeId} from '@/types/game/meal/main';
import {PotInfo} from '@/types/game/potInfo';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {CookingCommonFilter} from '@/ui/cooking/common/type';
import {MealMakerPopupCommonProps} from '@/ui/cooking/make/recipe/popup/type';


export type MealMakerRecipeData = {
  meal: Meal,
  info: MealStrengthInfo,
};

export type MealMakerFilter = CookingCommonFilter & MealInputFilterLevelAgnostic & {
  showUnmakeableRecipe: boolean,
};

export type MealMakerCommonProps = FilterWithUpdaterProps<MealMakerFilter> & MealMakerPopupCommonProps & {
  meals: Meal[],
  mealTypes: MealTypeId[],
  potInfoList: PotInfo[],
  preloaded: CookingConfig,
};
