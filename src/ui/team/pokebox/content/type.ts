import {PokemonInfo} from '@/types/game/pokemon';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {PokeInBox} from '@/types/userData/pokebox';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeInBoxChangeableProps = {
  bundle: ConfigBundle,
  snorlaxFavorite: SnorlaxFavorite,
};

export type PokeInBoxCommonProps = PokeInBoxChangeableProps & {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
  ratingBasis: PokeboxViewerDisplay['ratingBasis'],
};
