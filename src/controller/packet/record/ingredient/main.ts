import {Collection} from 'mongodb';

import {undefinedIngredientChainId} from '@/const/game/pokemon';
import {toPacketUpdatePokemonData} from '@/controller/packet/record/ingredient/convert';
import {getPokedexMap} from '@/controller/pokemon/info';
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
  const pokemonMap = await getPokedexMap(data.map(({num}) => num));

  const ops = data
    .flatMap((packet) => {
      const pokemonData = pokemonMap[packet.num];
      if (!pokemonData || pokemonData.ingredientChain !== undefinedIngredientChainId) {
        return [];
      }

      return toPacketUpdatePokemonData({
        packet,
        pokedexInternalIdMap,
      });
    })
    .map((entry) => ({
      updateOne: {
        filter: entry,
        update: {$set: entry},
        upsert: true,
      },
    }));

  if (!ops.length) {
    return;
  }

  return (await getCollection()).bulkWrite(ops);
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({pokemonUniqueId: 1, ingredientLevel: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize Packet pokemon index', e));
