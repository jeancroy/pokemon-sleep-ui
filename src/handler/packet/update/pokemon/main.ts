import {storePacketUpdatePokemonData} from '@/controller/packet/update/pokemon';
import {throwIfNotInboundApiToken} from '@/handler/common/check';
import {isPacketDataFromApiIncludingSource, isPacketRecordingEnabled} from '@/handler/packet/utils';
import {PacketUpdatePokemonDataFromApi} from '@/types/packet/update/pokemon';


export const handlePacketUpdatePokemonData = async (request: Request) => {
  const response = await request.json() as PacketUpdatePokemonDataFromApi;

  throwIfNotInboundApiToken(response.token);

  if (!(await isPacketRecordingEnabled('updatePokemonData'))) {
    return Response.json({}, {status: 503});
  }

  if (!isPacketDataFromApiIncludingSource(response)) {
    return Response.json({}, {status: 400});
  }

  await storePacketUpdatePokemonData(response.data.map((entry) => ({
    ...entry,
    _source: response.source,
  })));

  return Response.json({}, {status: 200});
};
