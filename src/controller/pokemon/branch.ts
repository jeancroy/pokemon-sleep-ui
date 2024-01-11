import {Collection} from 'mongodb';

import {getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PokemonId} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';


const getCollection = async (): Promise<Collection<PokemonBranchData>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonBranchData>('branch');
};

export const getAssociatedPokemonBranchData = async (pokemonId: PokemonId) => {
  return getSingleData(getCollection(), {$or: [{pokemonId}, {branches: pokemonId}]});
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({pokemonId: 1}, {unique: true}),
    collection.createIndex({branches: 1}),
  ]);
};

addIndex()
  .catch((e) => console.error('MongoDB failed to initialize Pokemon branch data index', e));
