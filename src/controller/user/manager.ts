import {createUserDataManager} from '@/controller/user/common';
import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {UserConfig} from '@/types/userData/config/user/main';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export const userDataPokedex = createUserDataManager<Omit<PokedexDisplay, 'ingredient'>>('pokedex');

export const userDataPokeboxDisplay = createUserDataManager<PokeboxViewerDisplay>('pokeboxDisplay');

export const userDataUserConfig = createUserDataManager<UserConfig>('settings');

export const userDataCookingConfig = createUserDataManager<CookingConfig>('cooking');

export const userRatingConfig = createUserDataManager<RatingConfig>('ratingConfig');
