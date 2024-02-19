import {ProductionPeriod} from '@/types/game/producing/display';
import {
  GroupedProducingRate,
  PokemonProducingRate,
  PokemonProducingRateByType,
  ProducingRateByCalculatedStates,
} from '@/types/game/producing/rate';
import {ProducingStateCalculated} from '@/types/game/producing/state';


type GroupProducingRatesOpts = {
  period: ProductionPeriod,
  rates: ProducingRateByCalculatedStates[],
  state: ProducingStateCalculated,
};

export const groupProducingRates = ({
  period,
  rates,
  state,
}: GroupProducingRatesOpts): GroupedProducingRate<number> => {
  return rates.reduce((group, single) => {
    const {id, qty, strength} = single;

    group[id] = {
      period,
      qty: (group[id]?.qty ?? 0) + qty[state],
      strength: (group[id]?.strength ?? 0) + strength[state],
    };
    return group;
  }, {} as GroupedProducingRate<number>);
};

type GroupPokemonProducingRateOpts = {
  period: ProductionPeriod,
  rates: PokemonProducingRate[],
  state: ProducingStateCalculated,
};

export const groupPokemonProducingRate = ({
  period,
  rates,
  state,
}: GroupPokemonProducingRateOpts): PokemonProducingRateByType => {
  return {
    berry: groupProducingRates({
      period,
      rates: rates.map(({berry}) => berry),
      state,
    }),
    ingredient: groupProducingRates({
      period,
      rates: rates.flatMap(({ingredient}) => Object.values(ingredient)),
      state,
    }),
    skill: groupProducingRates({
      period,
      rates: rates.map(({skill}) => skill),
      state,
    }),
  };
};
