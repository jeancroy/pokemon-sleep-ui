import {storePacketLotteryInfo} from '@/controller/packet/lottery';
import {throwIfNotInboundApiToken} from '@/handler/common/check';
import {isPacketRecordingEnabled} from '@/handler/packet/utils';
import {PacketLotteryInfoFromApi} from '@/types/packet/lottery';


export const handlePacketLotteryInfo = async (request: Request) => {
  const response = await request.json() as PacketLotteryInfoFromApi;

  throwIfNotInboundApiToken(response.token);

  if (!(await isPacketRecordingEnabled('lotteryInfo'))) {
    return Response.json({}, {status: 503});
  }

  await storePacketLotteryInfo(response.data);

  return Response.json({}, {status: 200});
};
