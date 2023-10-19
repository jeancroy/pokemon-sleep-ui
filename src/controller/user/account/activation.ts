import {ObjectId} from 'bson';
import {Collection, MongoError} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import {getActivationKey, removeActivationKey} from '@/controller/user/account/key';
import mongoPromise from '@/lib/mongodb';
import {UserActivationData, UserActivationStatus} from '@/types/mongo/activation';


const getCollection = async (): Promise<Collection<UserActivationData>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<UserActivationData>('activation');
};

export const userActivateKey = async (userId: string, key: string): Promise<boolean> => {
  const activationKey = await getActivationKey(key);

  if (!activationKey) {
    return false;
  }

  try {
    await (await getCollection()).insertOne({userId: new ObjectId(userId), ...activationKey});
  } catch (e) {
    if (e instanceof MongoError) {
      return false;
    }

    throw e;
  }

  await removeActivationKey(activationKey.key);
  return true;
};

export const getUserActivation = async (userId: string): Promise<UserActivationStatus | null> => {
  const data = await getSingleData(getCollection(), {userId: new ObjectId(userId)});

  if (!data) {
    return null;
  }

  return data.activation;
};

export const getAllActivations = (): Promise<UserActivationData[]> => getDataAsArray(getCollection());

export const getPaidUserCount = async () => (await getCollection()).countDocuments({source: {$ne: null}});

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1}, {unique: true}),
    collection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize user ads free data index', e));