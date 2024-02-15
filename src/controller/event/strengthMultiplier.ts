import {Collection} from 'mongodb';

import {getCurrentEventData} from '@/controller/event/utils';
import mongoPromise from '@/lib/mongodb';
import {EventStrengthMultiplierData, EventStrengthMultiplierEntry} from '@/types/game/event/strengthMultiplier';


const getCollection = async (): Promise<Collection<EventStrengthMultiplierEntry>> => {
  const client = await mongoPromise;

  return client
    .db('event')
    .collection<EventStrengthMultiplierEntry>('strengthMultiplier');
};

export const getEventStrengthMultiplierData = async (): Promise<EventStrengthMultiplierData> => {
  const current = await getCurrentEventData({getCollection});

  return {current};
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({internalId: 1}, {unique: true}),
    collection.createIndex({startEpoch: 1, endEpoch: 1, multiplier: -1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize event strength multiplier index', e));
