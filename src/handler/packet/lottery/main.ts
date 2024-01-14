import {storePacketLotteryInfo} from '@/controller/packet/lottery';
import {performPacketApiEndpointsCommonCheck} from '@/handler/packet/common';
import {convertPacketDataFromApiToCompliantFormat} from '@/handler/packet/utils/convert';
import {PacketLotteryInfoFromApiNonCompliant} from '@/types/packet/lottery';


export const handlePacketLotteryInfo = async (request: Request) => {
  const requestData = await request.json() as PacketLotteryInfoFromApiNonCompliant;

  const response = await performPacketApiEndpointsCommonCheck(requestData);
  if (response) {
    return response;
  }

  await storePacketLotteryInfo(convertPacketDataFromApiToCompliantFormat({
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
