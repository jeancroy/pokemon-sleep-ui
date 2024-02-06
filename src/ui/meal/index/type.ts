import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {Migratable} from '@/types/migrate';
import {UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';


export type MealFilter = Migratable & {
  mealType: FilterInclusionMap<MealTypeId>,
  mealLevel: number,
  ingredient: FilterInclusionMap<IngredientId>,
  potCapacity: number | null,
  showEnergy: boolean,
};

export type MealDataProps = UserSettingsRequiredData & {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  preloaded: UserSettingsBundle,
};
