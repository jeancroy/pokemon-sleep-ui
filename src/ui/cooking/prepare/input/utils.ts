import {defaultUserCookingSettings} from '@/const/user/cooking';
import {UserCookingSettings} from '@/types/userData/settings/cooking/settings';
import {CookingPreloadedData} from '@/ui/cooking/common/type';
import {MealPreparerFilter} from '@/ui/cooking/prepare/type';


type ToUserCookingSettingsFromMealPreparerFilterOpts = {
  preloaded: CookingPreloadedData['cooking'],
  filter: MealPreparerFilter,
};

export const toUserCookingSettingsFromMealPreparerFilter = ({
  preloaded,
  filter,
}: ToUserCookingSettingsFromMealPreparerFilterOpts): UserCookingSettings => {
  return {
    ...defaultUserCookingSettings,
    ...preloaded,
    ingredientCount: filter.inventory,
    recipeLevel: filter.recipeLevel,
    mealsWanted: filter.mealsWanted,
    mealsMarked: filter.mealsMarked,
  };
};

