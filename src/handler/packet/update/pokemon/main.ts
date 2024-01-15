import {storePacketUpdatePokemonData} from '@/controller/packet/update/pokemon';
import {performPacketApiEndpointsCommonCheck} from '@/handler/packet/common';
import {convertPacketDataFromApiToStorable} from '@/handler/packet/utils/convert';
import {PacketUpdatePokemonDataFromApi} from '@/types/packet/update/pokemon';


export const handlePacketUpdatePokemonData = async (request: Request) => {
  const requestData = await request.json() as PacketUpdatePokemonDataFromApi;

  const response = await performPacketApiEndpointsCommonCheck(requestData);
  if (response) {
    return response;
  }

  await storePacketUpdatePokemonData(convertPacketDataFromApiToStorable({
    dataFromApi: requestData,
    toData: ({source, data, key}) => {
      const ret = {...data, _source: source};

      if (key) {
        return {...ret, pid: Number(key)};
      }

      return ret;
    },
  }));

  return Response.json({}, {status: 200});
};
