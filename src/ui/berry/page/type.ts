import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {BerryData} from '@/types/game/berry';
import {BerryFavoriteInfo} from '@/types/game/mapMeta';
import {UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';


export type BerryPageDataProps =
  UserSettingsRequiredData &
  Omit<PokemonBerryStatsCommonProps, 'bundle' | 'translatedSettings'> & {
    berryData: BerryData,
    favoriteInfo: BerryFavoriteInfo,
    preloaded: UserSettingsBundle,
  };
