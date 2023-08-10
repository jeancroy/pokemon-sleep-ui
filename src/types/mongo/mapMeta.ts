import {BerryId} from '@/types/mongo/berry';
import {SleepMapId} from '@/types/mongo/sleepStyle';


export type MapUnlockCondition = null | {
  type: 'sleepStyle',
  count: number,
};

export type MapMeta = {
  mapId: SleepMapId,
  berry: BerryId[],
  unlock: MapUnlockCondition,
};

export type FieldMetaMap = {[map in SleepMapId]?: MapMeta};
