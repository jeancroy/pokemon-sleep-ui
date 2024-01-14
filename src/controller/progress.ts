import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {GameProgressData} from '@/types/game/progress';


const getCollection = async (): Promise<Collection<GameProgressData>> => {
  const client = await mongoPromise;

  return client
    .db('game')
    .collection<GameProgressData>('progress');
};

export const getAllGameProgressData = async (): Promise<GameProgressData[]> => {
  return getDataAsArray(getCollection());
};
