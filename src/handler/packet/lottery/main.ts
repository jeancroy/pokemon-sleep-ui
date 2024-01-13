import {storePacketLotteryInfo} from '@/controller/packet/lottery';
import {performPacketApiEndpointsCommonCheck} from '@/handler/packet/common';
import {PacketLotteryInfoFromApi} from '@/types/packet/lottery';


export const handlePacketLotteryInfo = async (request: Request) => {
  const requestData = await request.json() as PacketLotteryInfoFromApi;

  const response = await performPacketApiEndpointsCommonCheck(requestData);
  if (response) {
    return response;
  }

  await storePacketLotteryInfo(requestData.data.map((entry) => ({
    ...entry,
    _source: requestData.source,
  })));

  return Response.json({}, {status: 200});
};
