import {ConfigBundle} from '@/types/userData/config/bundle';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type UserPreloadedContent = ConfigBundle & {
  pokedex: PokedexDisplay,
  pokeboxDisplay: PokeboxViewerDisplay,
};
