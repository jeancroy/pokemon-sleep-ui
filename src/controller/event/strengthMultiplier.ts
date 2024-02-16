import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import {getCurrentEventData} from '@/controller/event/utils';
import mongoPromise from '@/lib/mongodb';
import {EventId} from '@/types/game/event/common';
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

type GetEventStrengthMultiplierOfEventsOpts = {
  eventIds: EventId[],
};

export const getEventStrengthMultiplierOfEvents = ({
  eventIds,
}: GetEventStrengthMultiplierOfEventsOpts) => {
  return getDataAsArray(getCollection(), {eventId: {$in: eventIds}}, {startEpoch: 1});
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({internalId: 1}, {unique: true}),
    collection.createIndex({eventId: 1}),
    collection.createIndex({startEpoch: 1, endEpoch: 1, multiplier: -1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize event strength multiplier index', e));
