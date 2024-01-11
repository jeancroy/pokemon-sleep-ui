import {storePacketUpdateData} from '@/controller/packet/update';
import {throwIfNotInboundApiToken} from '@/handler/common/check';
import {PacketUpdateDataFromApi} from '@/types/packet/update';


export const handlePacketUpdateData = async (request: Request) => {
  const response = await request.json() as PacketUpdateDataFromApi;

  throwIfNotInboundApiToken(response.token);

  await storePacketUpdateData(response.data);

  return Response.json({}, {status: 200});
};
