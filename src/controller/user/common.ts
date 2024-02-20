import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {UserDataInDatabase} from '@/types/mongo/activation';


export const getUserData = async <TData>(
  collectionPromise: Promise<Collection<UserDataInDatabase<TData>>>,
  userId: string,
) => {
  return (await collectionPromise).findOne({userId});
};

export const setUserData = async <TData>(
  collectionPromise: Promise<Collection<UserDataInDatabase<TData>>>,
  userId: string,
  data: TData,
) => (
  (await collectionPromise).updateOne({userId}, {$set: {data}}, {upsert: true})
);

const addIndex = async <TData>(
  collectionPromise: Promise<Collection<UserDataInDatabase<TData>>>,
) => {
  const collection = await collectionPromise;

  return Promise.all([
    collection.createIndex({userId: 1}, {unique: true}),
  ]);
};

export const createUserDataManager = <TData>(collectionName: string) => {
  const getCollection = async (): Promise<Collection<UserDataInDatabase<TData>>> => {
    const client = await mongoPromise;

    return client
      .db('user')
      .collection<UserDataInDatabase<TData>>(collectionName);
  };

  addIndex(getCollection())
    .catch((e) => console.error(`MongoDB failed to initialize index of user data [${collectionName}]`, e));

  return {
    getCollection,
    getData: (userId: string) => getUserData(getCollection(), userId),
    getDataOptional: (userId?: string) => userId ? getUserData(getCollection(), userId) : null,
    setData: (userId: string, data: TData) => setUserData(getCollection(), userId, data),
  };
};
