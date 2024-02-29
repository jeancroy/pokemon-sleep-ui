import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PotInfo} from '@/types/game/potInfo';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {CalculatedCookingConfigRequiredData} from '@/types/userData/config/data';


export type CookingConfigDataProps = CalculatedCookingConfigRequiredData & {
  potInfoList: PotInfo[],
  recipeLevelData: RecipeLevelData[],
  mealTypes: MealTypeId[],
  ingredientIds: IngredientId[],
};

export type CookingConfigUiCommonProps = CookingConfigDataProps & {
  cookingConfig: CookingConfig,
  setCookingConfig: (updated: Partial<CookingConfig>) => void,
};
