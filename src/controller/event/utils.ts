import {Collection, WithId} from 'mongodb';

import {getSingleData} from '@/controller/common';
import {EventCommonData} from '@/types/game/event/common';


type GetCurrentEventDataOpts<TData extends EventCommonData> = {
  getCollection: () => Promise<Collection<TData>>,
};

export const getCurrentEventData = async <TData extends EventCommonData>({
  getCollection,
}: GetCurrentEventDataOpts<TData>): Promise<WithId<TData> | null> => {
  return getSingleData(
    getCollection(),
    // @ts-ignore: TS is unable to know that the key of `TData` must have `startEpoch` and `endEpoch` for some reason
    {
      startEpoch: {$lt: Date.now() / 1000},
      endEpoch: {$gte: Date.now() / 1000},
    },
    {startEpoch: 1},
  );
};
