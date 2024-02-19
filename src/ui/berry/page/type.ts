import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {BerryData} from '@/types/game/berry';
import {BerryFavoriteInfo} from '@/types/game/mapMeta';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type BerryPageDataProps =
  ConfigRequiredData &
  Omit<PokemonBerryStatsCommonProps, 'bundle' | 'calculatedConfigBundle'> & {
    berryData: BerryData,
    favoriteInfo: BerryFavoriteInfo,
    preloaded: ConfigBundle,
  };
