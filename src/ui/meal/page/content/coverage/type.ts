import {PokemonItemStatsCalcResult} from '@/components/shared/pokemon/icon/itemStats/type';
import {MealCoverage} from '@/types/game/cooking';
import {MealPageContentCommonProps} from '@/ui/meal/page/content/type';
import {MealCommonProps} from '@/ui/meal/page/type';


export type MealContentCoverageCommonProps = MealCommonProps & MealPageContentCommonProps;

export type MealContentCoverageItemData = {
  calcResult: PokemonItemStatsCalcResult,
  coverage: MealCoverage,
};
