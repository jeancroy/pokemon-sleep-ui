import {storePacketLotteryInfo} from '@/controller/packet/lottery';
import {performPacketApiEndpointsCommonCheck} from '@/handler/packet/common';
import {convertPacketDataFromApiToStorable} from '@/handler/packet/utils/convert';
import {PacketLotteryInfoFromApi} from '@/types/packet/lottery';


export const handlePacketLotteryInfo = async (request: Request) => {
  const requestData = await request.json() as PacketLotteryInfoFromApi;

  const response = await performPacketApiEndpointsCommonCheck(requestData);
  if (response) {
    return response;
  }

  await storePacketLotteryInfo(convertPacketDataFromApiToStorable({
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
