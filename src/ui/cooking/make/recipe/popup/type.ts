import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
import {UserDataActionStatus} from '@/types/userData/main';


export type MealMakerPopupCommonProps = {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  calculatedUserConfig: CalculatedUserConfig,
  status: UserDataActionStatus,
  onCook: (ingredientsUsed: IngredientCounter) => Promise<void>,
};
