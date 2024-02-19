import {UserSettingsBundle} from '@/types/userData/settings/main';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type UserPreloadedContent = UserSettingsBundle & {
  pokedex: PokedexDisplay,
  pokeboxDisplay: PokeboxViewerDisplay,
};
