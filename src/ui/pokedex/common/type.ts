import {PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {PokedexDisplayType} from '@/ui/pokedex/index/input/type';


export type PokedexFilterCommon = PokemonIndividualParams & Pick<PokemonInputFilter, 'ingredient'> & {
  snorlaxFavorite: SnorlaxFavorite,
  sort: PokemonSortType,
  display: PokedexDisplayType,
};
