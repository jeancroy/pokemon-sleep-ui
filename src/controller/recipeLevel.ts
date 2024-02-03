import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {RecipeLevelData, RecipeLevelDataModel} from '@/types/game/meal/recipeLevel';


const toRecipeLevelData = ({bonus, ...rest}: RecipeLevelDataModel): RecipeLevelData => {
  return {
    ...rest,
    bonus: parseFloat(bonus.toString()),
  };
};

const getCollection = async (): Promise<Collection<RecipeLevelDataModel>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<RecipeLevelDataModel>('recipeLevel');
};

export const getRecipeLevelData = async (): Promise<RecipeLevelData[]> => (
  (await getDataAsArray(getCollection())).map(toRecipeLevelData)
);

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({level: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize recipe level data index', e));
