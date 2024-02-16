import {Collection} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {EventIdentifier, EventInfo} from '@/types/game/event/info';


const getCollection = async (): Promise<Collection<EventInfo>> => {
  const client = await mongoPromise;

  return client
    .db('event')
    .collection<EventInfo>('info');
};

export const getEventInfoList = async (): Promise<EventInfo[]> => {
  return getDataAsArray(getCollection(), {}, {startEpoch: -1});
};

export const getEventInfo = async (eventIdentifier: EventIdentifier): Promise<EventInfo | null> => {
  return getSingleData(getCollection(), {eventIdentifier});
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({eventIdentifier: 1}, {unique: true}),
    collection.createIndex({startEpoch: 1, endEpoch: 1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize event info list index', e));
