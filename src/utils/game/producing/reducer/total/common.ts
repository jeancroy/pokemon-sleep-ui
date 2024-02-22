import {ProducingRate} from '@/types/game/producing/rate/base';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {getTotalOfItemRates} from '@/utils/game/producing/reducer/total/itemRate';
import {KeysOfType} from '@/utils/type';


type GetPokemonProducingRateCommonOpts = {
  rate: PokemonProducingRate,
  target: KeysOfType<ProducingRate, number>,
  state: ProducingStateCalculated,
};

export const getTotalIngredientRateOfPokemon = ({
  rate,
  target,
  state,
}: GetPokemonProducingRateCommonOpts): number => (
  getTotalOfItemRates({rates: Object.values(rate.ingredient), target, state})
);

export const getTotalOfPokemonProducingRate = ({
  rate,
  state,
}: Omit<GetPokemonProducingRateCommonOpts, 'target'>): ProducingRate => {
  const {
    params,
    berry,
    skill,
  } = rate;
  const {period} = params;

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
