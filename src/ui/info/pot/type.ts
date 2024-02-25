import {MealInputFilterLevelGnostic} from '@/components/shared/meal/filter/levelGnostic/type';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PotInfo} from '@/types/game/potInfo';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type PotInfoDataProps = ConfigRequiredData & {
  ingredientMap: IngredientMap,
  potInfoList: PotInfo[],
  recipeLevelData: RecipeLevelData[],
  preloaded: ConfigBundle,
};

export type PotInfoFilter = MealInputFilterLevelGnostic & {
  capacity: number,
};
