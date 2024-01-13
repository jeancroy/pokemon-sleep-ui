import {storePacketLotteryInfo} from '@/controller/packet/lottery';
import {throwIfNotInboundApiToken} from '@/handler/common/check';
import {isPacketDataFromApiIncludingSource, isPacketRecordingEnabled} from '@/handler/packet/utils';
import {PacketLotteryInfoFromApi} from '@/types/packet/lottery';


export const handlePacketLotteryInfo = async (request: Request) => {
  const response = await request.json() as PacketLotteryInfoFromApi;

  throwIfNotInboundApiToken(response.token);

  if (!(await isPacketRecordingEnabled('lotteryInfo'))) {
    return Response.json({}, {status: 503});
  }

  if (!isPacketDataFromApiIncludingSource(response)) {
    return Response.json({}, {status: 400});
  }

  await storePacketLotteryInfo(response.data.map((entry) => ({
    ...entry,
    _source: response.source,
  })));

  return Response.json({}, {status: 200});
};
