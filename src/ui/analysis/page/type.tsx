import {PokemonInputFilterExtended, UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {SleepStyleNormalMap} from '@/types/game/sleepStyle';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {CommonServerDataCollection} from '@/types/website/data/common';


export type AnalysisComparisonFilter = PokemonInputFilterExtended & {
  ingredients: IngredientProductionAtLevels,
};

export type AnalysisPageCommonProps = Pick<
  CommonServerDataCollection,
  keyof ConfigRequiredData |
  keyof UsePokemonFilterCommonData |
  'berryDataMap' |
  'mainSkillMap' |
  'subSkillMap' |
  'pokemonProducingParamsMap' |
  'fieldMetaMap' |
  'recipeLevelData'
> & {
  pokemonList: PokemonInfo[],
  pokemon: PokemonInfo,
  sleepStyleMap: SleepStyleNormalMap,
  pokemonMaxLevel: number,
};

export type AnalysisPageServerDataProps = {
  pokemonList: PokemonInfo[],
  pokemon: PokemonInfo,
  sleepStyleMap: SleepStyleNormalMap,
  pokemonMaxLevel: number,
};
