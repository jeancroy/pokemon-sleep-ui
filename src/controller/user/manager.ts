import {createUserDataManager} from '@/controller/user/common';
import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {UserCookingSettings} from '@/types/userData/settings/cooking/settings';
import {UserSettings} from '@/types/userData/settings/main';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export const userDataPokedex = createUserDataManager<Omit<PokedexDisplay, 'ingredient'>>('pokedex');

export const userDataPokeboxDisplay = createUserDataManager<PokeboxViewerDisplay>('pokeboxDisplay');

export const userDataSettings = createUserDataManager<UserSettings>('settings');

export const userDataCookingSettings = createUserDataManager<UserCookingSettings>('cooking');

export const userRatingConfig = createUserDataManager<RatingConfig>('ratingConfig');
