import {defaultUserCookingSettings} from '@/const/user/cooking';
import {UserCookingSettings} from '@/types/userData/settings/cooking/settings';
import {CookingPreloadedData} from '@/ui/cooking/common/type';
import {MealMakerFilter} from '@/ui/cooking/make/type';


type ToUserCookingSettingsOpts = {
  preloaded: CookingPreloadedData['cooking'],
  filter: MealMakerFilter,
};

export const toUserCookingSettingsFromMealMakerFilter = ({
  preloaded,
  filter,
}: ToUserCookingSettingsOpts): UserCookingSettings => {
  return {
    ...defaultUserCookingSettings,
    ...preloaded,
    potCapacity: filter.capacity,
    mealType: filter.type,
    ingredients: filter.ingredient,
    ingredientCount: filter.inventory,
    recipeLevel: filter.recipeLevel,
    showUnmakeableRecipe: filter.showUnmakeableRecipe,
    mealsMarked: filter.mealsMarked,
  };
};

