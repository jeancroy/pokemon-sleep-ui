import {MapIndexSleepdexCompletionProps} from '@/components/shared/sleepStyle/common/type';
import {FieldMetaMap} from '@/types/game/mapMeta';


export type MapIndexServerDataProps = MapIndexSleepdexCompletionProps & {
  fieldMetaMap: FieldMetaMap,
  isLoggedIn: boolean,
  isUnique?: boolean,
};
