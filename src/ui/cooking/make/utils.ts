import {defaultCookingConfig} from '@/const/user/config/cooking';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {MealMakerFilter} from '@/ui/cooking/make/type';


type ToCookingConfigFromMealMakerFilterOpts = {
  preloaded: CookingConfig,
  filter: MealMakerFilter,
};

export const toCookingConfigFromMealMakerFilter = ({
  preloaded,
  filter,
}: ToCookingConfigFromMealMakerFilterOpts): CookingConfig => {
  return {
    ...defaultCookingConfig,
    ...preloaded,
    mealType: filter.mealType,
    ingredientCount: filter.inventory,
    recipeLevel: filter.recipeLevel,
    showUnmakeableRecipe: filter.showUnmakeableRecipe,
    mealsMarked: filter.mealsMarked,
  };
};
