import {storePacketUpdatePokemonData} from '@/controller/packet/update/pokemon';
import {throwIfNotInboundApiToken} from '@/handler/common/check';
import {isPacketRecordingEnabled} from '@/handler/packet/utils';
import {PacketUpdatePokemonDataFromApi} from '@/types/packet/update/pokemon';


export const handlePacketUpdatePokemonData = async (request: Request) => {
  const response = await request.json() as PacketUpdatePokemonDataFromApi;

  throwIfNotInboundApiToken(response.token);

  if (!(await isPacketRecordingEnabled('updatePokemonData'))) {
    return Response.json({}, {status: 503});
  }

  await storePacketUpdatePokemonData(response.data);

  return Response.json({}, {status: 200});
};
