import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {ResearchRankData} from '@/types/game/researchRank';


const getCollection = async (): Promise<Collection<ResearchRankData>> => {
  const client = await mongoPromise;

  return client
    .db('game')
    .collection<ResearchRankData>('researchRank');
};

export const getResearchRankData = (): Promise<ResearchRankData[]> => getDataAsArray(getCollection());

export const getPokemonMaxLevelByResearchRank = async (): Promise<number> => {
  const collection = await getCollection();

  return (await collection.findOne({}, {sort: {pokemonMaxLevel: -1}, limit: 1}))?.pokemonMaxLevel ?? NaN;
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({rank: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize research rank data index', e));
