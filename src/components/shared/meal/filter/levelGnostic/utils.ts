import {generateEmptyMealFilterLevelAgnostic} from '@/components/shared/meal/filter/levelAgnostic/utils';
import {MealInputFilterLevelGnostic} from '@/components/shared/meal/filter/levelGnostic/type';


export const generateEmptyMealFilterLevelGnostic = (): MealInputFilterLevelGnostic => ({
  ...generateEmptyMealFilterLevelAgnostic(),
  recipeLevel: 1,
});
