import {productionMultiplierByPeriod} from '@/const/game/production/multiplier';
import {PokemonProductionTotal} from '@/types/game/producing/rate/main';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {getTeamMakerIngredientStats} from '@/ui/team/maker/calc/ingredient';
import {reduceTeamMakerResultComp} from '@/ui/team/maker/calc/utils/reducer';
import {TeamMakerCalcDataProps} from '@/ui/team/maker/type';
import {TeamMakerCalcResultsOpts} from '@/ui/team/maker/type/calc';
import {TeamMakerResultComp} from '@/ui/team/maker/type/result';
import {toSum} from '@/utils/array';
import {getMealCoverage} from '@/utils/game/cooking';
import {getMealIngredientInfoFromTargetMeals} from '@/utils/game/meal/ingredient';
import {toIngredientProductionCounterFromGroupedRate} from '@/utils/game/producing/ingredient/utils';
import {getPokemonProductionMulti} from '@/utils/game/producing/main/entry/multi';
import {getTotalOfGroupedProduction} from '@/utils/game/producing/reducer/total/grouped';
import {getTotalStrengthProductionFromIndirectSkill} from '@/utils/game/producing/reducer/total/indirectSkill';
import {getSnorlaxRankFinalEstimate} from '@/utils/game/rank';
import {isNotNullish} from '@/utils/type';


type GetTeamMakerCompsOpts = TeamMakerCalcDataProps & TeamMakerCalcResultsOpts;

export const getTeamMakerComps = ({
  ingredientMap,
  recipeLevelData,
  snorlaxData,
  input,
  calculatedCookingConfig,
  teamComps,
  ...opts
}: GetTeamMakerCompsOpts): TeamMakerResultComp[] => {
  const {
    snorlaxFavorite,
    ingredientCount,
    showInsufficientIngredients,
    teamCompsToShow,
    basis,
  } = input;

  const comps: TeamMakerResultComp[] = [];
  for (const teamComp of teamComps) {
    const rates = getPokemonProductionMulti({
      ingredientMap,
      recipeLevelData,
      rateOpts: teamComp.map(({payload}) => ({
        opts: payload.calcOpts,
        payload: payload.refData,
      })),
      sharedOpts: {
        ...opts,
        snorlaxFavorite,
        period: teamMakerProductionPeriod,
      },
      groupingState: 'equivalent',
      calculatedCookingConfig,
    });

    const strengthByType: PokemonProductionTotal = {
      berry: getTotalOfGroupedProduction({rate: rates.grouped.berry, key: 'strength'}),
      ingredient: getTotalOfGroupedProduction({rate: rates.grouped.ingredient, key: 'strength'}),
      skill: (
        getTotalOfGroupedProduction({rate: rates.grouped.skill, key: 'strength'}) +
        toSum(rates.rates.map(({atStage}) => getTotalStrengthProductionFromIndirectSkill({
          skillIndirect: atStage.final.skillIndirect,
        })))
      ),
    };
    const strengthTotal = toSum(Object.values(strengthByType));
    const ingredientStats = getTeamMakerIngredientStats({
      required: getMealIngredientInfoFromTargetMeals({
        targetMeals: calculatedCookingConfig.targetMeals,
        days: productionMultiplierByPeriod[teamMakerProductionPeriod],
      }).ingredientsRequired,
      inventory: ingredientCount,
      production: rates.grouped.ingredient,
    });

    if (
      !showInsufficientIngredients &&
      Object.keys(ingredientStats.shortage).length > 0 &&
      Object.values(ingredientStats.shortage).filter(isNotNullish).some((count) => count > 0)
    ) {
      continue;
    }

    const ingredientProduction = toIngredientProductionCounterFromGroupedRate(rates.grouped.ingredient);

    comps.push({
      rates,
      strengthByType,
      basisValue: {
        mealCoverage: getMealCoverage({
          meals: calculatedCookingConfig.targetMeals,
          ingredientProduction,
          period: teamMakerProductionPeriod,
        }),
        strength: strengthTotal,
        ingredientProduction,
      },
      ingredientStats,
      finalEstimates: getSnorlaxRankFinalEstimate({
        strength: strengthTotal,
        snorlaxData,
      }),
    });
  }

  return reduceTeamMakerResultComp({
    comps,
    basis,
    count: teamCompsToShow,
  });
};
