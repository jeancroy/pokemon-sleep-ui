import {FilterInclusionMap} from '@/components/input/filter/type';
import potCapacity from '@/data/potCapacity.json';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {CookingUserSettingsRequiredData} from '@/types/userData/settings/cooking';
import {UserSettingsBundle} from '@/types/userData/settings/main';


export type PotInfoDataProps = CookingUserSettingsRequiredData & {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  preloaded: UserSettingsBundle,
};

export type PotInfoFilter = {
  mealType: FilterInclusionMap<MealTypeId>,
  mealLevel: number,
  ingredients: FilterInclusionMap<IngredientId>,
  capacity: number | null,
  showEmpty: boolean,
  showEnergy: boolean,
};

export type PotLevelInfo = typeof potCapacity[number];
