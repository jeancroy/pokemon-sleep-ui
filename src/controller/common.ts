import {Collection, Document, Filter, Sort, WithId} from 'mongodb';

import {Indexable} from '@/utils/type';


export const getDataAsMap = async <TData extends Document>(
  collection: Promise<Collection<TData>>,
  getKey: (data: WithId<TData>) => Indexable,
  filter?: Filter<TData>,
) => {
  return Object.fromEntries((await (await collection)
    .find(filter ?? {}, {projection: {_id: false}})
    .toArray())
    .map((data) => [getKey(data), data]));
};

export const getDataAsMapWithConverter = async <TData extends Document, TValue>(
  collection: Promise<Collection<TData>>,
  getKey: (data: WithId<TData>) => Indexable,
  getValue: (data: WithId<TData>) => TValue,
  filter?: Filter<TData>,
) => {
  return Object.fromEntries((await (await collection)
    .find(filter ?? {}, {projection: {_id: false}})
    .toArray())
    .map((data) => [getKey(data), getValue(data)]));
};

export const getDataAsArray = async <TData extends Document>(
  collection: Promise<Collection<TData>>,
  filter?: Filter<TData>,
  sort?: Sort,
) => {
  return (await collection).find(filter ?? {}, {projection: {_id: false}, sort}).toArray();
};

export const getSingleData = async <TData extends Document>(
  collection: Promise<Collection<TData>>,
  filter?: Filter<TData>,
  sort?: Sort,
) => {
  return (await collection).findOne(filter ?? {}, {projection: {_id: false}, sort});
};
