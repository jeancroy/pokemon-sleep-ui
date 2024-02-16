import {Collection} from 'mongodb';

import {defaultDrowsyPowerMultiplier} from '@/const/game/event';
import {getDataAsArray} from '@/controller/common';
import {getCurrentEventData} from '@/controller/event/utils';
import mongoPromise from '@/lib/mongodb';
import {EventId} from '@/types/game/event/common';
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

type GetEventDrowsyPowerMultiplierOfEventsOpts = {
  eventIds: EventId[],
};

export const getEventDrowsyPowerMultiplierOfEvents = ({
  eventIds,
}: GetEventDrowsyPowerMultiplierOfEventsOpts) => {
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

addIndex().catch((e) => console.error('MongoDB failed to initialize event drowsy power multiplier index', e));
