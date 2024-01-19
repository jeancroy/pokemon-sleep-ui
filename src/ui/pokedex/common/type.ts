import {PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {pokemonSortType, PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export const pokedexDisplayType = [
  ...pokemonSortType,
  'berry',
  'ingredient',
  'mainSkill',
  'sleepType',
  'specialty',
] as const;

export type PokedexDisplayType = typeof pokedexDisplayType[number];

export type PokedexFilterCommon<
  TSort extends PokemonSortType = PokemonSortType,
  TDisplay extends PokedexDisplayType = PokedexDisplayType,
> = PokemonIndividualParams & Pick<PokemonInputFilter, 'ingredient' | 'mainSkill'> & {
  snorlaxFavorite: SnorlaxFavorite,
  sort: TSort,
  display: TDisplay,
};
