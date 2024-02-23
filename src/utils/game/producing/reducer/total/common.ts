import {Production} from '@/types/game/producing/rate/base';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {getTotalOfItemRates} from '@/utils/game/producing/reducer/total/itemRate';
import {KeysOfType} from '@/utils/type';


type GetPokemonProductionCommonOpts = {
  rate: PokemonProduction,
  target: KeysOfType<Production, number>,
  state: ProducingStateCalculated,
};

export const getTotalPokemonIngredientProduction = ({
  rate,
  target,
  state,
}: GetPokemonProductionCommonOpts): number => (
  getTotalOfItemRates({rates: Object.values(rate.ingredient), target, state})
);

export const getTotalPokemonProduction = ({
  rate,
  state,
}: Omit<GetPokemonProductionCommonOpts, 'target'>): Production => {
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
      getTotalPokemonIngredientProduction({rate, target: 'qty', state})
    ),
    strength: (
      berry.strength[state] +
      getTotalPokemonIngredientProduction({rate, target: 'strength', state}) +
      skill.strength[state]
    ),
  };
};
