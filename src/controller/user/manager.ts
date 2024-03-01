import {createUserDataManager} from '@/controller/user/common';
import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {ProductionComparisonConfig} from '@/types/productionComparison';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {UserConfig} from '@/types/userData/config/user/main';
import {PokedexFilterSave} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export const userDataPokedex = createUserDataManager<Omit<PokedexFilterSave, 'ingredient'>>(
  'pokedex',
);

export const userDataPokeboxDisplay = createUserDataManager<PokeboxViewerDisplay>(
  'pokeboxDisplay',
);

export const userDataUserConfig = createUserDataManager<UserConfig>(
  'settings',
);

export const userDataCookingConfig = createUserDataManager<CookingConfig>(
  'cooking',
);

export const userRatingConfig = createUserDataManager<RatingConfig>(
  'ratingConfig',
);

export const userProductionComparisonConfig = createUserDataManager<ProductionComparisonConfig>(
  'productionComparison/config',
);
