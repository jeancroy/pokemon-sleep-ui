import {
  GroupedProducingRate,
  PokemonProducingRate,
  ProducingRate,
  ProducingRateByCalculatedStates,
} from '@/types/game/producing/rate';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';
import {isNotNullish, KeysOfType} from '@/utils/type';


type GetTotalOfItemRatesOpts = {
  rates: ProducingRateByCalculatedStates[],
  target: KeysOfType<ProducingRate, number>,
  state: ProducingStateCalculated,
};

export const getTotalOfItemRates = ({rates, target, state}: GetTotalOfItemRatesOpts): number => (
  toSum(rates.map((rate) => rate[target][state]))
);

type GetTotalOfGroupedProducingRateOpts = {
  rate: GroupedProducingRate<number>,
  key: KeysOfType<ProducingRate, number>,
};

export const getTotalOfGroupedProducingRate = ({rate, key}: GetTotalOfGroupedProducingRateOpts) => {
  return toSum(Object.values(rate).filter(isNotNullish).map((rate) => rate[key]));
};

type GetPokemonProducingRateComponentOpts = {
  rate: PokemonProducingRate,
  target: KeysOfType<ProducingRate, number>,
  state: ProducingStateCalculated,
};

export const getTotalIngredientRateOfPokemon = ({
  rate,
  target,
  state,
}: GetPokemonProducingRateComponentOpts) => (
  getTotalOfItemRates({rates: Object.values(rate.ingredient), target, state})
);

export const getTotalOfPokemonProducingRate = ({
  rate,
  state,
}: Omit<GetPokemonProducingRateComponentOpts, 'target'>): ProducingRate => {
  const {period, berry, skill} = rate;

  return {
    period,
    qty: (
      // Not adding `skill.energy[state]` here because this quantity is used for calculating carry limit,
      // but skill trigger count doesn't occupy inventory space
      berry.qty[state] +
      getTotalIngredientRateOfPokemon({rate, target: 'qty', state})
    ),
    strength: (
      berry.strength[state] +
      getTotalIngredientRateOfPokemon({rate, target: 'strength', state}) +
      skill.strength[state]
    ),
  };
};

export const getTotalStrengthOfPokemonProducingRate = (rate: PokemonProducingRate): number => {
  return getTotalOfPokemonProducingRate({rate, state: 'equivalent'}).strength;
};
