import {Collection} from 'mongodb';

import {getDataAsArray, getDataAsMapWithConverter} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {SubSkillData, SubSkillDataModel, SubSkillMap} from '@/types/game/pokemon/subSkill';


const toSubSkillData = ({bonus, ...rest}: SubSkillDataModel): SubSkillData => {
  return {
    ...rest,
    bonus: Object.fromEntries(
      Object.entries(bonus).map(([key, value]) => [key, parseFloat(value.toString())]),
    ),
  };
};

const getCollection = async (): Promise<Collection<SubSkillDataModel>> => {
  const client = await mongoPromise;

  return client
    .db('skill')
    .collection<SubSkillDataModel>('sub');
};

export const getAllSubSkillData = async (): Promise<SubSkillData[]> => {
  return (await getDataAsArray(getCollection())).map(toSubSkillData);
};

export const getSubSkillMap = async (): Promise<SubSkillMap> => {
  return getDataAsMapWithConverter(getCollection(), ({id}) => id, toSubSkillData);
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({id: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize sub skill index', e));
