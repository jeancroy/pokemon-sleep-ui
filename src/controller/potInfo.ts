import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PotInfo} from '@/types/game/potInfo';


const getCollection = async (): Promise<Collection<PotInfo>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<PotInfo>('pot');
};

export const getPotInfoList = async (): Promise<PotInfo[]> => getDataAsArray(getCollection());

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({level: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize pot info index', e));
