import {PokemonInfo} from '@/types/game/pokemon';
import {ProductionByCalculatedStates} from '@/types/game/producing/rate/base';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {PokemonAnalysisRateInfo, ProductionOfBerryOnPokemon} from '@/ui/analysis/page/calc/production/type';
import {AnalysisStatsProduction} from '@/ui/analysis/page/calc/type';


type GetContinuousBerryStatsOpts = {
  samples: ProductionOfBerryOnPokemon[],
  pokemon: PokemonInfo,
  currentRate: ProductionByCalculatedStates,
  getComparer: (rate: ProductionByCalculatedStates) => number,
};

const getContinuousBerryStats = ({
  samples,
  pokemon,
  getComparer,
  currentRate,
}: GetContinuousBerryStatsOpts) => {
  return getAnalysisStatsOfContinuous({
    samples,
    getPokemonId: ({pokemon}) => pokemon.id,
    isCurrentRank: (sample) => sample.pokemon.id === pokemon.id,
    getValue: ({rate}) => getComparer(rate),
    getLinkedData: ({rate}) => getComparer(rate),
    isLinked: ({rate}) => getComparer(rate) > getComparer(currentRate),
    currentValue: getComparer(currentRate),
  });
};

type ToAnalysisBerryProductionOpts<T> = Omit<GetContinuousBerryStatsOpts, 'getComparer' | 'samples'> & {
  itemId: T,
  rateOfAllPokemon: PokemonAnalysisRateInfo[],
};

export const toAnalysisBerryProduction = <T>({
  itemId,
  rateOfAllPokemon,
  ...props
}: ToAnalysisBerryProductionOpts<T>): AnalysisStatsProduction<T, number> => {
  const pokemonIdsInRates = rateOfAllPokemon.map(({pokemon}) => pokemon.id);
  // `.filter().map()` to make sure `berryRates` only have Pokémon in Pokédex
  // because `rateOfAllPokemon` contains all ingredient possibilities
  const berryRates = rateOfAllPokemon
    .filter(({pokemon}, idx) => pokemonIdsInRates.indexOf(pokemon.id) == idx)
    .map(({pokemon, rate}) => ({pokemon, rate: rate.berry}));

  return {
    itemId,
    count: getContinuousBerryStats({
      getComparer: (rate) => rate.qty.equivalent,
      samples: berryRates,
      ...props,
    }),
    strength: getContinuousBerryStats({
      getComparer: (rate) => rate.strength.equivalent,
      samples: berryRates,
      ...props,
    }),
  };
};
