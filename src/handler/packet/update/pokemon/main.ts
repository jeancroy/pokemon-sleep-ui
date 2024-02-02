import {storePacketRecordIngredientData} from '@/controller/packet/record/ingredient/main';
import {storePacketUpdatePokemonData} from '@/controller/packet/update/pokemon';
import {getPokedexInternalIdMap} from '@/controller/pokemon/info';
import {performPacketApiEndpointsCommonCheck} from '@/handler/packet/common';
import {convertPacketDataFromApiToStorable} from '@/handler/packet/utils/convert';
import {PacketUpdatePokemonData, PacketUpdatePokemonDataFromApi} from '@/types/packet/update/pokemon';


export const handlePacketUpdatePokemonData = async (request: Request) => {
  const requestData = await request.json() as PacketUpdatePokemonDataFromApi;

  const response = await performPacketApiEndpointsCommonCheck(requestData);
  if (response) {
    return response;
  }

  const storable = convertPacketDataFromApiToStorable<
    PacketUpdatePokemonData,
    PacketUpdatePokemonDataFromApi
  >({
    dataFromApi: requestData,
    toData: ({source, data, key}) => {
      const ret = {...data, _source: source};

      if (key) {
        return {...ret, pid: Number(key)};
      }

      return ret;
    },
  });

  const pokedexInternalIdMap = await getPokedexInternalIdMap();

  await Promise.all([
    storePacketRecordIngredientData({data: storable, pokedexInternalIdMap}),
    storePacketUpdatePokemonData(storable),
  ]);

  return Response.json({}, {status: 200});
};
