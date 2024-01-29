import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';


const getCollection = async (): Promise<Collection<StaminaCookingRecoveryData>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<StaminaCookingRecoveryData>('recovery');
};

export const getStaminaCookingRecoveryData = (): Promise<StaminaCookingRecoveryData[]> => (
  getDataAsArray(getCollection())
);

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({internalId: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize stamina cooking recovery data index', e));
