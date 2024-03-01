import {PokemonInputFilter, PokemonInputFilterExtended} from '@/components/shared/pokemon/filter/type';
import {pokemonSortType, PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';


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
> =
  PokemonIndividualParams &
  Pick<PokemonInputFilter, 'ingredient' | 'mainSkill'> &
  Pick<PokemonInputFilterExtended, 'mainSkillLevel' | 'snorlaxFavorite'> & {
    sort: TSort,
    display: TDisplay,
  };
