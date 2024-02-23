import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type MealDataProps = ConfigRequiredData & {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  preloaded: ConfigBundle,
};
