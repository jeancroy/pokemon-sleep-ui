import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {MealsMarked} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PotInfo} from '@/types/game/potInfo';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type CookingServerDataProps = ConfigRequiredData & {
  ingredientMap: IngredientMap,
  potInfoList: PotInfo[],
  recipeLevelData: RecipeLevelData[],
  preloaded: ConfigBundle,
};

export type CookingCommonFilter = {
  recipeLevel: RecipeLevel,
  inventory: IngredientCounter,
  mealsMarked: MealsMarked,
};
