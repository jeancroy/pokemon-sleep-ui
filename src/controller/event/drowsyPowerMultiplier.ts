import {Collection} from 'mongodb';

import {defaultDrowsyPowerMultiplier} from '@/const/game/event';
import {getCurrentEventData} from '@/controller/event/utils';
import mongoPromise from '@/lib/mongodb';
import {
  EventDrowsyPowerMultiplierData,
  EventDrowsyPowerMultiplierEntry,
} from '@/types/game/event/drowsyPowerMultiplier';


const getCollection = async (): Promise<Collection<EventDrowsyPowerMultiplierEntry>> => {
  const client = await mongoPromise;

  return client
    .db('event')
    .collection<EventDrowsyPowerMultiplierEntry>('drowsyPowerMultiplier');
};

export const getEventDrowsyPowerMultiplierData = async (): Promise<EventDrowsyPowerMultiplierData> => {
  const current = await getCurrentEventData({getCollection});

  return {
    current,
    max: (await (await getCollection()).findOne(
      {},
      {sort: {multiplier: -1}},
    ))?.multiplier ?? defaultDrowsyPowerMultiplier,
  };
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({entryId: 1}, {unique: true}),
    collection.createIndex({startEpoch: 1, endEpoch: 1, multiplier: -1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize event drowsy power multiplier index', e));
