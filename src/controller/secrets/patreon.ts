import {Collection} from 'mongodb';

import {getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PatreonSecretsData} from '@/types/subscription/patreon/secrets';
import {Nullable} from '@/utils/type';


const getCollection = async (): Promise<Collection<PatreonSecretsData>> => {
  const client = await mongoPromise;

  return client
    .db('secrets')
    .collection<PatreonSecretsData>('patreon');
};

export const getPatreonSecrets = (): Promise<Nullable<PatreonSecretsData>> => getSingleData(getCollection());

export const updatePatreonSecrets = async (data: PatreonSecretsData) => {
  return (await getCollection()).updateOne({}, {$set: data}, {upsert: true});
};

const initialize = async () => {
  const collection = await getCollection();

  if (!await collection.countDocuments({})) {
    await collection.insertOne({
      tokenType: '(Unknown)',
      accessToken: '<ACCESS_TOKEN>',
      refreshToken: '<REFRESH_TOKEN>',
    });
  }
};

initialize().catch((e) => console.error('MongoDB failed to initialize Patreon secrets collection', e));
