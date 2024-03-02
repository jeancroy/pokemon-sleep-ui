import {PokemonInputFilterExtended} from '@/components/shared/pokemon/filter/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {SleepStyleNormalMap} from '@/types/game/sleepStyle';


export type AnalysisComparisonFilter = PokemonInputFilterExtended & {
  ingredients: IngredientProductionAtLevels,
};

export type AnalysisPageCommonProps = {
  pokemonList: PokemonInfo[],
  pokemon: PokemonInfo,
  sleepStyleMap: SleepStyleNormalMap,
};

export type AnalysisPageServerDataProps = {
  pokemonList: PokemonInfo[],
  pokemon: PokemonInfo,
  sleepStyleMap: SleepStyleNormalMap,
};
