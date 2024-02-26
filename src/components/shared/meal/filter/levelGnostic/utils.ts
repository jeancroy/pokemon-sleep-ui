import {generateEmptyMealFilterLevelAgnostic} from '@/components/shared/meal/filter/levelAgnostic/utils';
import {MealInputFilterLevelGnostic} from '@/components/shared/meal/filter/levelGnostic/type';
import {CookingConfig} from '@/types/userData/config/cooking/main';


export const generateEmptyMealFilterLevelGnostic = (cookingConfig: CookingConfig): MealInputFilterLevelGnostic => ({
  ...generateEmptyMealFilterLevelAgnostic(cookingConfig),
  recipeLevel: 1,
});
