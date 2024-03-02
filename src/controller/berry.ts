import {Collection} from 'mongodb';

import {getDataAsMap, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {BerryData, BerryDataMap, BerryId} from '@/types/game/berry';


const getCollection = async (): Promise<Collection<BerryData>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<BerryData>('berry');
};

export const getBerryData = async (id: BerryId): Promise<BerryData | null> => (
  getSingleData(getCollection(), {id})
);

export const getBerryDataMap = async (): Promise<BerryDataMap> => {
  return getDataAsMap(getCollection(), ({id}) => id);
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({id: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize berry index', e));
