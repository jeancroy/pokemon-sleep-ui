import {PokemonSorterGetterOpts} from '@/components/shared/pokemon/sorter/type';
import {ProducingRateByCalculatedStates, ProducingValueByCalculatedStates} from '@/types/game/producing/rate/base';
import {
  PokemonProducingRate,

} from '@/types/game/producing/rate/main';
import {toSum} from '@/utils/array';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {KeysOfType} from '@/utils/type';


export const getPokemonRateSorter = (opts: PokemonSorterGetterOpts): PokemonProducingRate => {
  const {bundle, calculatedCookingConfig} = opts.calculatedConfigBundle;

  return getPokemonProducingRateSingle({...opts, bundle, calculatedCookingConfig}).atStage.final;
};

type GetPokemonItemRateSorterOpts = {
  key: KeysOfType<ProducingRateByCalculatedStates, ProducingValueByCalculatedStates>,
  opts: PokemonSorterGetterOpts,
};

export const getBerryRateSorter = ({key, opts}: GetPokemonItemRateSorterOpts): number => {
  const rateOfPokemon = getPokemonRateSorter(opts);

  return rateOfPokemon.berry[key].equivalent;
};

export const getIngredientTotalRateSorter = ({key, opts}: GetPokemonItemRateSorterOpts): number => {
  const rateOfPokemon = getPokemonRateSorter(opts);

  return toSum(Object.values(rateOfPokemon.ingredient)
    .map((rate) => rate[key].equivalent));
};

export const getIngredientFirstRateSorter = ({key, opts}: GetPokemonItemRateSorterOpts): number => {
  const rateOfPokemon = getPokemonRateSorter(opts);

  const first = Object.values(rateOfPokemon.ingredient).at(0);
  if (!first) {
    return NaN;
  }

  return first[key].equivalent;
};
