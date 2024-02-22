import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';

import {IngredientId} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {ProducingRateByCalculatedStates} from '@/types/game/producing/rate/base';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {
  PokemonAnalysisRateInfo,
  ProducingRateOfIngredientsOnPokemon,
} from '@/ui/analysis/page/calc/producingRate/type';
import {isRateOfPokemonSame} from '@/ui/analysis/page/calc/producingRate/utils';
import {
  AnalysisIngredientStatsLinkedData,
  AnalysisStats,
  AnalysisStatsProducingRate,
} from '@/ui/analysis/page/calc/type';
import {toSum} from '@/utils/array';
import {groupIngredientProductions} from '@/utils/game/producing/ingredient/group';
import {getTotalOfItemRates} from '@/utils/game/producing/reducer/total/itemRate';


type GetContinuousIngredientStatsOpts = {
  samples: ProducingRateOfIngredientsOnPokemon[],
  currentRate: ProducingRateByCalculatedStates[],
  currentIngredients: IngredientProduction[],
  pokemon: PokemonInfo,
  getComparer: (rates: ProducingRateByCalculatedStates[]) => number,
};

const getContinuousIngredientStats = ({
  samples,
  currentRate,
  currentIngredients,
  pokemon,
  getComparer,
}: GetContinuousIngredientStatsOpts) => {
  // Current ingredients need to be grouped, or the comparison of something like Apple x 2 / Apple x 1 fails
  const currentIngredientsGrouped = groupIngredientProductions(currentIngredients);

  return getAnalysisStatsOfContinuous({
    samples,
    getPokemonId: ({pokemon}) => pokemon.id,
    isCurrentRank: (sample) => (
      sample.pokemon.id === pokemon.id &&
      isEqual(
        sortBy(sample.productionsGrouped, ({id}) => id),
        sortBy(currentIngredientsGrouped, ({id}) => id),
      )
    ),
    getValue: ({rates}) => getComparer(rates),
    getLinkedData: ({rates, productions}) => ({
      productions,
      value: getComparer(rates),
    }) satisfies AnalysisIngredientStatsLinkedData,
    isLinked: ({rates}) => getComparer(rates) > getComparer(currentRate),
    currentValue: getComparer(currentRate),
  });
};

export type ToAnalysisIngredientProducingRateOpts<T> = Omit<
  GetContinuousIngredientStatsOpts,
  'getComparer' | 'getLinkedData'
> & {
  itemId: T,
};

export const toAnalysisIngredientProducingRate = <T>({
  itemId,
  ...props
}: ToAnalysisIngredientProducingRateOpts<T>): AnalysisStatsProducingRate<T, AnalysisIngredientStatsLinkedData> => {
  return {
    itemId,
    count: getContinuousIngredientStats({
      ...props,
      getComparer: (rates) => (
        toSum(rates.filter(({id}) => id === itemId).map(({qty}) => qty.equivalent))
      ),
    }),
    strength: getContinuousIngredientStats({
      ...props,
      getComparer: (rates) => (
        toSum(rates.filter(({id}) => id === itemId).map(({strength}) => strength.equivalent))
      ),
    }),
  };
};

type ToAnalysisIngredientProducingStatsOpts = {
  pokemon: PokemonInfo,
  ingredients: IngredientProduction[],
  current: PokemonProducingRate,
  rateOfAllPokemon: PokemonAnalysisRateInfo[],
};

export const toAnalysisIngredientProducingStats = ({
  pokemon,
  ingredients,
  current,
  rateOfAllPokemon,
}: ToAnalysisIngredientProducingStatsOpts): AnalysisStats['producingRate']['ingredient'] => {
  const ingredientRates: {[ingredientId in IngredientId]?: ProducingRateOfIngredientsOnPokemon[]} = {};
  for (const {pokemon, productions, rate} of rateOfAllPokemon) {
    const ratesOfIngredients = Object.values(rate.ingredient);

    for (const rateOfIngredient of ratesOfIngredients) {
      if (!(rateOfIngredient.id in ingredientRates)) {
        ingredientRates[rateOfIngredient.id] = [];
      }

      ingredientRates[rateOfIngredient.id]?.push({
        pokemon,
        productions,
        productionsGrouped: groupIngredientProductions(productions),
        rates: ratesOfIngredients,
      });
    }
  }

  const currentIngredientRates = Object.values(current.ingredient);
  const currentDailyTotalOfIngredient = getTotalOfItemRates({
    rates: currentIngredientRates,
    target: 'strength',
    state: 'equivalent',
  });

  return {
    // Using `currentIngredientRates` for getting the ingredient IDs, so it won't be duplicated
    individual: currentIngredientRates.map(({id}) => toAnalysisIngredientProducingRate({
      itemId: id,
      pokemon,
      samples: ingredientRates[id] ?? [],
      currentRate: currentIngredientRates,
      currentIngredients: ingredients,
    })),
    overall: getAnalysisStatsOfContinuous({
      samples: rateOfAllPokemon
        .map((rateOfPokemon) => ({
          ...rateOfPokemon,
          totalEnergy: getTotalOfItemRates({
            rates: Object.values(rateOfPokemon.rate.ingredient),
            target: 'strength',
            state: 'equivalent',
          }),
        })),
      getPokemonId: ({pokemon}) => pokemon.id,
      getValue: ({totalEnergy}) => totalEnergy,
      getLinkedData: ({totalEnergy}) => totalEnergy,
      isLinked: ({totalEnergy}) => totalEnergy > currentDailyTotalOfIngredient,
      isCurrentRank: (sample) => isRateOfPokemonSame(sample, {pokemon, rate: current}),
      currentValue: currentDailyTotalOfIngredient,
    }),
  };
};
