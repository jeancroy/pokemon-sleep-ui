import {MealFilterAgnosticRequiredData} from '@/components/shared/meal/filter/levelAgnostic/type';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';


export type UseMealInputFilterOpts<TFilter> = MealFilterAgnosticRequiredData & {
  recipeLevelData: RecipeLevelData[],
  calculatedConfigBundle: CalculatedConfigBundle,
  initialFilter: TFilter,
};
