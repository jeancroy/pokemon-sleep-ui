import {Collection} from 'mongodb';

import {getDataAsArray, getDataAsMap, getDataAsMapWithConverter, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {BerryId} from '@/types/game/berry';
import {PokedexInternalIdMap, PokedexMap, PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainId} from '@/types/game/pokemon/ingredient';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';


const getCollection = async (): Promise<Collection<PokemonInfo>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonInfo>('info');
};

export const getSinglePokemonInfo = (id: number) => (
  getSingleData(getCollection(), {id})
);

export const getPokemonList = (): Promise<PokemonInfo[]> => {
  return getDataAsArray(getCollection());
};

export const getPokedexMap = (ids?: PokemonId[]): Promise<PokedexMap> => {
  return getDataAsMap(getCollection(), ({id}) => id, ids ? {id: {$in: ids}} : {});
};

export const getPokedexInternalIdMap = (): Promise<PokedexInternalIdMap> => (
  getDataAsMapWithConverter(
    getCollection(),
    ({internalId}) => internalId,
    ({id}) => id,
  )
);

export const getPokemonByBerry = async (berryId: BerryId) => {
  return getDataAsArray(getCollection(), {'berry.id': berryId});
};

export const getPokemonByMainSkill = async (skill: MainSkillId) => {
  return getDataAsArray(getCollection(), {skill});
};

export const getPokemonByIngredientChain = async (chainIds: IngredientChainId[]) => {
  return getDataAsArray(getCollection(), {ingredientChain: {$in: chainIds}});
};

export const getPokemonRequiringItemToEvolve = async () => (
  getDataAsArray(getCollection(), {'evolution.next.conditions.type': 'item'})
);

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({id: 1}, {unique: true}),
    collection.createIndex({'berry.id': 1}),
    collection.createIndex({skill: 1}),
    collection.createIndex({'evolution.next.conditions.type': 1, 'evolution.next.conditions.item': 1}, {sparse: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize pokemon info index', e));
