import {MealCoverage} from '@/types/game/cooking';
import {Production} from '@/types/game/producing/rate/base';
import {TeamProduction} from '@/types/teamAnalysis';
import {getTeamCompCalcResult} from '@/ui/team/analysis/calc/comp';
import {getTeamProductionTotal} from '@/ui/team/analysis/calc/total';
import {GetTeamProductionOpts} from '@/ui/team/analysis/calc/type';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {getMealCoverage} from '@/utils/game/cooking';
import {toIngredientProductionCounterFromGroupedRate} from '@/utils/game/producing/ingredient/utils';
import {getTotalOfGroupedProduction} from '@/utils/game/producing/reducer/total/grouped';


export const getTeamProduction = (opts: GetTeamProductionOpts): TeamProduction => {
  const {
    currentTeam,
    calculatedCookingConfig,
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

  const total = getTeamProductionTotal({
    period: analysisPeriod,
    bySlot,
    state: stateOfRateToShow,
  });

  const overall: Production = {
    period: analysisPeriod,
    strength: getTotalOfGroupedProduction({rate: total, key: 'strength'}),
    qty: getTotalOfGroupedProduction({rate: total, key: 'qty'}),
  };

  const mealCoverage: MealCoverage = getMealCoverage({
    meals: calculatedCookingConfig.targetMeals,
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
