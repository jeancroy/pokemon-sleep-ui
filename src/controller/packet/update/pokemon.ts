import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PacketUpdatePokemonData} from '@/types/packet/update/pokemon';


const getCollection = async (): Promise<Collection<PacketUpdatePokemonData>> => {
  const client = await mongoPromise;

  return client
    .db('packet')
    .collection<PacketUpdatePokemonData>('update/pokemon');
};

export const storePacketUpdatePokemonData = async (data: PacketUpdatePokemonData[]) => {
  return (await getCollection()).bulkWrite(data.map((entry) => ({
    updateOne: {
      filter: {pid: entry.pid},
      update: {$set: entry},
      upsert: true,
    },
  })));
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({pid: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize Packet pokemon index', e));
