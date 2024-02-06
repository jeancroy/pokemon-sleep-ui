import {Collection} from 'mongodb';

import {getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {EventStrengthMultiplierData, EventStrengthMultiplierEntry} from '@/types/game/event/strengthMultiplier';


const getCollection = async (): Promise<Collection<EventStrengthMultiplierEntry>> => {
  const client = await mongoPromise;

  return client
    .db('event')
    .collection<EventStrengthMultiplierEntry>('strengthMultiplier');
};

export const getEventStrengthMultiplierData = async (): Promise<EventStrengthMultiplierData> => {
  const current = await getSingleData(
    getCollection(),
    {
      startEpoch: {$lt: Date.now() / 1000},
      endEpoch: {$gte: Date.now() / 1000},
    },
    {startEpoch: 1},
  );

  return {current};
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({entryId: 1}, {unique: true}),
    collection.createIndex({startEpoch: 1, endEpoch: 1, multiplier: -1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize event strength multiplier index', e));
