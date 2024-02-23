import {PokemonSorterGetterOpts} from '@/components/shared/pokemon/sorter/type';
import {ProductionByCalculatedStates, ProductionValueByCalculatedStates} from '@/types/game/producing/rate/base';
import {
  PokemonProduction,

} from '@/types/game/producing/rate/main';
import {toSum} from '@/utils/array';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {KeysOfType} from '@/utils/type';


export const getPokemonRateSorter = (opts: PokemonSorterGetterOpts): PokemonProduction => {
  const {bundle, calculatedCookingConfig} = opts.calculatedConfigBundle;

  return getPokemonProductionSingle({...opts, bundle, calculatedCookingConfig}).atStage.final;
};

type GetPokemonItemRateSorterOpts = {
  key: KeysOfType<ProductionByCalculatedStates, ProductionValueByCalculatedStates>,
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
