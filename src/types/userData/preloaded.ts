import {UserCookingPreset} from '@/types/userData/cooking';
import {UserSettings} from '@/types/userData/settings/main';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type UserPreloadedContent = {
  cooking: UserCookingPreset,
  pokedex: PokedexDisplay,
  pokeboxDisplay: PokeboxViewerDisplay,
  settings: UserSettings,
};
