import {FieldMetaMap} from '@/types/game/mapMeta';
import {MapIndexSleepdexCompletionProps} from '@/ui/sleepStyle/map/common/type';


export type MapIndexServerDataProps = MapIndexSleepdexCompletionProps & {
  mapMeta: FieldMetaMap,
  isLoggedIn: boolean,
};