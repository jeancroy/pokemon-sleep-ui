import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {UserDataActionStatus} from '@/types/userData/main';
import {CalculatedUserSettings} from '@/types/userData/settings';


export type MealMakerPopupCommonProps = {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  calculatedSettings: CalculatedUserSettings,
  status: UserDataActionStatus,
  onCook: (ingredientsUsed: IngredientCounter) => Promise<void>,
};
