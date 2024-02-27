import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {DreamClusterData} from '@/types/game/dreamCluster';


const getCollection = async (): Promise<Collection<DreamClusterData>> => {
  const client = await mongoPromise;

  return client
    .db('game')
    .collection<DreamClusterData>('dreamCluster');
};

export const getDreamClusterDataList = (): Promise<DreamClusterData[]> => getDataAsArray(getCollection());

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({itemId: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize dream cluster data index', e));
