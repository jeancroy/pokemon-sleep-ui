import {MapMeta} from '@/types/game/mapMeta';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {Nullable} from '@/utils/type';


export const toSnorlaxFavoriteBerryFromMapMeta = (mapMeta: Nullable<MapMeta>): SnorlaxFavorite['berry'] => {
  if (!mapMeta) {
    return {};
  }
  const {berry} = mapMeta;

  return Object.fromEntries(berry?.map((favorite) => [favorite, true]) ?? []);
};
