import {Collection, Filter} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {EventIdentifier, EventInfo} from '@/types/game/event/info';


const getCollection = async (): Promise<Collection<EventInfo>> => {
  const client = await mongoPromise;

  return client
    .db('event')
    .collection<EventInfo>('info');
};

export type GetEventInfoListOpts = {
  epochSec?: number,
  includePast: true,
} | {
  epochSec: number,
  includePast: false,
};

export const getEventInfoList = async ({epochSec, includePast}: GetEventInfoListOpts): Promise<EventInfo[]> => {
  let filter: Filter<EventInfo> = {};

  if (!includePast) {
    filter = {endEpoch: {$gte: epochSec}};
  }

  return getDataAsArray(getCollection(), filter, {startEpoch: -1});
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
