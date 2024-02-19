import {defaultCookingConfig} from '@/const/user/config/cooking';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {MealPreparerFilter} from '@/ui/cooking/prepare/type';


type ToCookingSettingsFromMealPreparerFilterOpts = {
  preloaded: CookingConfig,
  filter: MealPreparerFilter,
};

export const toCookingSettingsFromMealPreparerFilter = ({
  preloaded,
  filter,
}: ToCookingSettingsFromMealPreparerFilterOpts): CookingConfig => {
  return {
    ...defaultCookingConfig,
    ...preloaded,
    ingredientCount: filter.inventory,
    recipeLevel: filter.recipeLevel,
    mealsWanted: filter.mealsWanted,
    mealsMarked: filter.mealsMarked,
  };
};

