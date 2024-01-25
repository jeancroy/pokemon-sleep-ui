import {Collection, Filter} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {PokemonId} from '@/types/game/pokemon';
import {
  FieldToFlattenedSleepStyleMap,
  SleepMapId,
  SleepStyleNormal,
  SleepStyleNormalFlattened,
  SleepStyleNormalMap,
} from '@/types/game/sleepStyle';


const getCollection = async (): Promise<Collection<SleepStyleNormal>> => {
  const client = await mongoPromise;

  return client
    .db('pokemon')
    .collection<SleepStyleNormal>('sleepStyle');
};

export const getSleepStyleNormalMap = async (): Promise<SleepStyleNormalMap> => {
  const ret: SleepStyleNormalMap = {};
  for await (const entry of await getDataAsArray(getCollection())) {
    if (!(entry.pokemonId in ret)) {
      ret[entry.pokemonId] = [] as SleepStyleNormalMap[PokemonId];
    }

    ret[entry.pokemonId]?.push(entry);
  }

  return ret;
};

export const getSleepStyleNormalList = async (pokemonId: number): Promise<SleepStyleNormal[]> => {
  return getDataAsArray(getCollection(), {pokemonId});
};

export const getSleepStyleNormalByMap = async (): Promise<FieldToFlattenedSleepStyleMap> => {
  const data = (await getCollection()).find({}, {projection: {_id: false}});

  const ret: FieldToFlattenedSleepStyleMap = {};
  for await (const entry of data) {
    if (!(entry.mapId in ret)) {
      ret[entry.mapId] = [] as FieldToFlattenedSleepStyleMap[SleepMapId];
    }

    const {styles, ...rest} = entry;

    ret[entry.mapId]?.push(...styles.map((style) => ({style, ...rest})));
  }

  return ret;
};

export const getSleepStyleNormalUniqueByMap = async (): Promise<FieldToFlattenedSleepStyleMap> => {
  const aggregated = (await getCollection())
    .aggregate([
      {$unwind: {path: '$styles'}},
      {
        $group: {
          _id: {
            pokemonId: '$pokemonId',
            style: '$styles.style',
          },
          data: {
            $push: {
              pokemonId: '$pokemonId',
              mapId: '$mapId',
              style: '$styles',
            },
          },
        },
      },
      {$match: {data: {$size: 1}}},
      {
        $project: {
          _id: false,
          pokemonId: '$_id.pokemonId',
          mapId: {$arrayElemAt: ['$data.mapId', 0]},
          style: {$arrayElemAt: ['$data.style', 0]},
        },
      },
      {
        $group: {
          _id: '$mapId',
          data: {$push: '$$ROOT'},
        },
      },
    ]);

  return Object.fromEntries(await aggregated.map(({_id, data}) => [_id, data]).toArray());
};

export const getSleepStyleNormalOfMap = async (mapId: number): Promise<SleepStyleNormalFlattened[]> => (
  getSleepStyleNormalFlattenedList({mapId})
);

export const getSleepStyleNormalFlattenedList = async (
  filter?: Filter<SleepStyleNormal>,
): Promise<SleepStyleNormalFlattened[]> => (
  (await (await getCollection()).find(filter ?? {}, {projection: {_id: false}}).toArray())
    .flatMap(({styles, ...props}) => (
      styles.map((style) => ({style, ...props}))
    ))
);

export const getSleepStyleNormalUnique = async (
  mapId: SleepMapId,
): Promise<SleepStyleNormalFlattened[]> => (await getCollection())
  .aggregate<SleepStyleNormalFlattened>([
    {$unwind: {path: '$styles'}},
    {
      $group: {
        _id: {
          pokemonId: '$pokemonId',
          style: '$styles.style',
        },
        data: {
          $push: {
            pokemonId: '$pokemonId',
            mapId: '$mapId',
            style: '$styles',
          },
        },
      },
    },
    {
      $match: {
        'data': {$size: 1},
        'data.mapId': mapId,
      },
    },
    {
      $project: {
        _id: false,
        pokemonId: '$_id.pokemonId',
        mapId: {$arrayElemAt: ['$data.mapId', 0]},
        style: {$arrayElemAt: ['$data.style', 0]},
      },
    },
  ])
  .toArray();

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex([{pokemonId: 1}, {mapId: 1}], {unique: true}),
    collection.createIndex({mapId: 1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize sleep style index', e));
