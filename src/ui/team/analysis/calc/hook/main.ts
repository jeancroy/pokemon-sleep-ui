import {MealCoverage} from '@/types/game/cooking';
import {ProducingRate} from '@/types/game/producing/rate';
import {getTeamCompCalcResult} from '@/ui/team/analysis/calc/comp';
import {useTeamProducingStatsTotal} from '@/ui/team/analysis/calc/hook/total';
import {UseTeamProducingStatsOpts} from '@/ui/team/analysis/calc/type';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {getMealCoverage} from '@/utils/game/cooking';
import {toIngredientProductionCounterFromGroupedRate} from '@/utils/game/producing/ingredient/utils';
import {getTotalOfGroupedProducingRate} from '@/utils/game/producing/rateReducer';


export const useTeamProducingStats = (opts: UseTeamProducingStatsOpts): TeamProducingStats => {
  const {
    currentTeam,
    cookingSettings,
  } = opts;
  const {
    snorlaxFavorite,
    analysisPeriod,
  } = currentTeam;

  const compsStats = getTeamCompCalcResult({
    period: analysisPeriod,
    state: stateOfRateToShow,
    snorlaxFavorite,
    ...opts,
  });
  const {
    bySlot,
    grouped,
  } = compsStats;

  const total = useTeamProducingStatsTotal({
    period: analysisPeriod,
    bySlot,
    state: stateOfRateToShow,
  });

  const overall: ProducingRate = {
    period: analysisPeriod,
    energy: getTotalOfGroupedProducingRate({rate: total, key: 'energy'}),
    quantity: getTotalOfGroupedProducingRate({rate: total, key: 'quantity'}),
  };

  const mealCoverage: MealCoverage = getMealCoverage({
    meals: cookingSettings.targetMeals,
    ingredientProduction: toIngredientProductionCounterFromGroupedRate(grouped.ingredient),
    period: analysisPeriod,
  });

  return {
    total,
    overall,
    mealCoverage,
    ...compsStats,
  };
};
