import {Collection} from 'mongodb';

import {getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {TeamAnalysisConfigData} from '@/types/mongo/teamAnalysis';
import {TeamAnalysisConfig} from '@/types/website/feature/teamAnalysis';


const getCollection = async (): Promise<Collection<TeamAnalysisConfigData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<TeamAnalysisConfigData>('teamAnalysis/config');
};

export const getTeamAnalysisConfigOfUser = async (userId: string) => (
  getSingleData(getCollection(), {userId})
);

type UpdateTeamAnalysisConfigOpts = {
  userId: string,
  config: TeamAnalysisConfig,
};

export const updateTeamAnalysisConfig = async ({userId, config}: UpdateTeamAnalysisConfigOpts) => {
  return (await getCollection()).updateOne({userId}, {$set: config}, {upsert: true});
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize team analysis config index', e));
