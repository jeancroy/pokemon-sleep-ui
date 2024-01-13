import {storePacketUpdatePokemonData} from '@/controller/packet/update/pokemon';
import {performPacketApiEndpointsCommonCheck} from '@/handler/packet/common';
import {PacketUpdatePokemonDataFromApi} from '@/types/packet/update/pokemon';


export const handlePacketUpdatePokemonData = async (request: Request) => {
  const requestData = await request.json() as PacketUpdatePokemonDataFromApi;

  const response = await performPacketApiEndpointsCommonCheck(requestData);
  if (response) {
    return response;
  }

  await storePacketUpdatePokemonData(requestData.data.map((entry) => ({
    ...entry,
    _source: requestData.source,
  })));

  return Response.json({}, {status: 200});
};
