import {UserCookingSettings} from '@/types/userData/settings/cooking/settings';
import {CookingCommonFilter} from '@/ui/cooking/common/type';


export const generateCookingCommonFilter = ({
  recipeLevel,
  ingredientCount,
  mealsMarked,
}: UserCookingSettings): CookingCommonFilter => ({
  recipeLevel,
  mealsMarked,
  inventory: ingredientCount,
});
