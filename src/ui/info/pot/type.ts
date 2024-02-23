import {MealInputFilter} from '@/components/shared/meal/filter/type';
import potCapacity from '@/data/potCapacity.json';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type PotInfoDataProps = ConfigRequiredData & {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  preloaded: ConfigBundle,
};

export type PotInfoFilter = MealInputFilter & {
  capacity: number,
};

export type PotLevelInfo = typeof potCapacity[number];
