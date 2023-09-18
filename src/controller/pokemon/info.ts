import {Collection} from 'mongodb';

import {getDataAsArray, getDataAsMap, getSingleData} from '@/controller/common';
import {getIngredientChainMapOfLevel} from '@/controller/ingredientChain';
import mongoPromise from '@/lib/mongodb';
import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {PokedexMap, PokemonId, PokemonInfo, PokemonIngredientData} from '@/types/game/pokemon';
import {IngredientLevel, ingredientLevels} from '@/types/game/pokemon/ingredient';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';


const getCollection = async (): Promise<Collection<PokemonInfo>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<PokemonInfo>('info');
};

export const getSinglePokemonInfo = async (id: number) => (
  getSingleData(getCollection(), {id})
);

export const getAllPokemonAsArray = async (): Promise<PokemonInfo[]> => {
  return getDataAsArray(getCollection());
};

export const getPokemonAsMap = async (ids?: PokemonId[]): Promise<PokedexMap> => {
  return getDataAsMap(getCollection(), ({id}) => id, ids ? {id: {$in: ids}} : {});
};

export const getPokemonIdsByIngredients = async (ingredientIds: IngredientId[]): Promise<PokemonIngredientData> => {
  const ret: PokemonIngredientData = {
    ingredient: {
      1: {},
      30: {},
      60: {},
    },
  };

  if (!ingredientIds.length) {
    return ret;
  }

  const insertDataOfLevel = async (level: IngredientLevel) => {
    const chainMap = await getIngredientChainMapOfLevel(level, ingredientIds);

    const pokemon = await getDataAsArray(
      getCollection(),
      {ingredientChain: {$in: Object.values(chainMap).map(({chainId}) => chainId)}},
    );

    for (const {id, ingredientChain} of pokemon) {
      const {ingredients} = chainMap[ingredientChain];

      for (const {id: ingredientId, qty} of ingredients[level]) {
        if (!(ingredientId in ret.ingredient[level])) {
          ret.ingredient[level][ingredientId] = [];
        }

        ret.ingredient[level][ingredientId]?.push({pokemon: id, qty});
      }
    }
  };

  await Promise.all(ingredientLevels.map((level) => insertDataOfLevel(level)));

  return ret;
};

export const getPokemonByBerry = async (berryId: BerryId) => {
  return getDataAsArray(getCollection(), {'berry.id': berryId});
};

export const getPokemonByMainSkill = async (skill: MainSkillId) => {
  return getDataAsArray(getCollection(), {skill});
};

export const getPokemonRequiringItemToEvolve = async () => (
  (await getCollection()).find({'evolution.next.conditions.type': 'item'})
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