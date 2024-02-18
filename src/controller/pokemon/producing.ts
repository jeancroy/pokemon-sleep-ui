import {Collection} from 'mongodb';

import {defaultProducingParams} from '@/const/game/production/defaults';
import {getDataAsMap, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PokemonProducingParams, PokemonProducingParamsMap} from '@/types/game/pokemon/producing';


const getCollection = async (): Promise<Collection<PokemonProducingParams>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonProducingParams>('producing');
};

export const getSinglePokemonProducingParams = async (pokemonId: number): Promise<PokemonProducingParams> => {
  return await getSingleData(getCollection(), {pokemonId}) ?? {pokemonId, ...defaultProducingParams};
};

export const getPokemonProducingParamsMap = async (): Promise<PokemonProducingParamsMap> => (
  getDataAsMap(getCollection(), ({pokemonId}) => pokemonId)
);

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({pokemonId: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to add Pokemon producing params index', e));
