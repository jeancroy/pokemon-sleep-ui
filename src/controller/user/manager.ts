import {createUserDataManager} from '@/controller/user/common';
import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserSettings} from '@/types/userData/settings';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';

// Preload

export const userDataCooking = createUserDataManager<UserCookingPreset>('cooking');

export const userDataPokedex = createUserDataManager<Omit<PokedexDisplay, 'ingredient'>>('pokedex');

export const userDataPokeboxDisplay = createUserDataManager<PokeboxViewerDisplay>('pokeboxDisplay');

export const userDataSettings = createUserDataManager<UserSettings>('settings');

export const userRatingConfig = createUserDataManager<RatingConfig>('ratingConfig');
