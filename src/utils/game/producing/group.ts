import {ProductionPeriod} from '@/types/game/producing/display';
import {ProductionByCalculatedStates} from '@/types/game/producing/rate/base';
import {
  GroupedProduction,
  GroupedProductionByType, PokemonProductionInitial,

} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';


type GroupProductionsOpts = {
  period: ProductionPeriod,
  rates: ProductionByCalculatedStates[],
  state: ProducingStateCalculated,
};

const groupProductions = ({
  period,
  rates,
  state,
}: GroupProductionsOpts): GroupedProduction<number> => {
  return rates.reduce((group, single) => {
    const {id, qty, strength} = single;

    group[id] = {
      period,
      qty: (group[id]?.qty ?? 0) + qty[state],
      strength: (group[id]?.strength ?? 0) + strength[state],
    };
    return group;
  }, {} as GroupedProduction<number>);
};

type GroupPokemonProductionOpts = {
  period: ProductionPeriod,
  rates: PokemonProductionInitial[],
  state: ProducingStateCalculated,
};

export const groupPokemonProduction = ({
  period,
  rates,
  state,
}: GroupPokemonProductionOpts): GroupedProductionByType => {
  return {
    berry: groupProductions({
      period,
      rates: rates.map(({berry}) => berry),
      state,
    }),
    ingredient: groupProductions({
      period,
      rates: rates.flatMap(({ingredient}) => Object.values(ingredient)),
      state,
    }),
    skill: groupProductions({
      period,
      rates: rates.map(({skill}) => skill),
      state,
    }),
  };
};
