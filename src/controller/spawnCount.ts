import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import {throwIfNotCmsMod} from '@/controller/user/account/common';
import {ControllerRequireUserIdOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {SpawnCountData, SpawnCountDataMap} from '@/types/game/spawnCount';
import {isNotNullish} from '@/utils/type';


const getCollection = async (): Promise<Collection<SpawnCountData>> => {
  const client = await mongoPromise;

  return client
    .db('map')
    .collection<SpawnCountData>('spawnCount');
};

export const getSpawnCountDataMap = async (): Promise<SpawnCountDataMap> => {
  const ret: SpawnCountDataMap = {};
  for await (const entry of await getDataAsArray(getCollection())) {
    if (!(entry.mapId in ret)) {
      ret[entry.mapId] = [] as SpawnCountData[];
    }

    ret[entry.mapId]?.push(entry);
  }

  return ret;
};

type UpdateSpawnCountOpts = ControllerRequireUserIdOpts & {
  data: SpawnCountDataMap,
};

export const updateSpawnCount = async ({executorUserId, data}: UpdateSpawnCountOpts) => {
  await throwIfNotCmsMod(executorUserId);

  const client = await mongoPromise;
  const collection = await getCollection();
  await client.withSession(async (session) => {
    await session.withTransaction(async () => {
      await collection.deleteMany();
      await collection.insertMany(
        Object.values(data).flatMap((data) => data).filter(isNotNullish),
        {session},
      );
    });
  });
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex([{mapId: 1}, {count: 1}], {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize spawn count index', e));
