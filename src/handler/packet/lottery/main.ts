import {storePacketLotteryInfo} from '@/controller/packet/lottery';
import {throwIfNotInboundApiToken} from '@/handler/common/check';
import {PacketLotteryInfoFromApi} from '@/types/packet/lottery';


export const handlePacketLotteryInfo = async (request: Request) => {
  const response = await request.json() as PacketLotteryInfoFromApi;

  throwIfNotInboundApiToken(response.token);

  await storePacketLotteryInfo(response.data);

  return Response.json({}, {status: 200});
};
