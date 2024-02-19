import {defaultCookingConfig} from '@/const/user/config/cooking';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {MealMakerFilter} from '@/ui/cooking/make/type';


type ToCookingSettingsOpts = {
  preloaded: CookingConfig,
  filter: MealMakerFilter,
};

export const toCookingSettingsFromMealMakerFilter = ({
  preloaded,
  filter,
}: ToCookingSettingsOpts): CookingConfig => {
  return {
    ...defaultCookingConfig,
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

