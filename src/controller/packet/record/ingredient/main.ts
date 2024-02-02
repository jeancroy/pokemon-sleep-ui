import {Collection} from 'mongodb';

import {toPacketUpdatePokemonData} from '@/controller/packet/record/ingredient/convert';
import mongoPromise from '@/lib/mongodb';
import {PokedexInternalIdMap} from '@/types/game/pokemon';
import {PokemonIngredientFromPacket} from '@/types/packet/record/ingredient';
import {PacketUpdatePokemonData} from '@/types/packet/update/pokemon';


const getCollection = async (): Promise<Collection<PokemonIngredientFromPacket>> => {
  const client = await mongoPromise;

  return client
    .db('packet')
    .collection<PokemonIngredientFromPacket>('record/ingredient');
};

type Props = {
  data: PacketUpdatePokemonData[],
  pokedexInternalIdMap: PokedexInternalIdMap,
};

export const storePacketRecordIngredientData = async ({data, pokedexInternalIdMap}: Props) => {
  return (await getCollection()).bulkWrite(
    data
      .flatMap((packet) => toPacketUpdatePokemonData({
        packet,
        pokedexInternalIdMap,
      }))
      .map((entry) => ({
        updateOne: {
          filter: entry,
          update: {$set: entry},
          upsert: true,
        },
      })),
  );
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({pokemonUniqueId: 1, ingredientLevel: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize Packet pokemon index', e));
