import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {EventId} from '@/types/game/event/common';
import {EventMission, EventMissionMap} from '@/types/game/event/mission';


const getCollection = async (): Promise<Collection<EventMission>> => {
  const client = await mongoPromise;

  return client
    .db('event')
    .collection<EventMission>('mission');
};

type GetEventMissionMapOpts = {
  eventIds: EventId[],
};

export const getEventMissionMap = async ({eventIds}: GetEventMissionMapOpts): Promise<EventMissionMap> => {
  const aggregated = (await getCollection())
    .aggregate([
      {$match: {eventId: {$in: eventIds}}},
      {
        $group: {
          _id: '$eventId',
          data: {$push: '$$ROOT'},
        },
      },
    ]);

  return Object.fromEntries(await aggregated.map(({_id, data}) => [_id, data]).toArray());
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({internalId: 1}, {unique: true}),
    collection.createIndex({eventId: 1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize event mission index', e));
