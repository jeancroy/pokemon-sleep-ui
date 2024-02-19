import {CookingConfig} from '@/types/userData/config/cooking/main';
import {CookingCommonFilter} from '@/ui/cooking/common/type';


export const generateCookingCommonFilter = ({
  recipeLevel,
  ingredientCount,
  mealsMarked,
}: CookingConfig): CookingCommonFilter => ({
  recipeLevel,
  mealsMarked,
  inventory: ingredientCount,
});
