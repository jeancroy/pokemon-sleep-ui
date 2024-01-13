import {throwIfNotInboundApiToken} from '@/handler/common/check';
import {isPacketDataFromApiIncludingSource, isPacketRecordingEnabled} from '@/handler/packet/utils';
import {PacketDataCommonProps, PacketDataFromApiCommonProps} from '@/types/packet/common';


export const performPacketApiEndpointsCommonCheck = async <TData extends PacketDataCommonProps>(
  requestData: PacketDataFromApiCommonProps<TData>,
): Promise<Response | null> => {
  throwIfNotInboundApiToken(requestData.token);

  if (!(await isPacketRecordingEnabled('lotteryInfo'))) {
    return Response.json({}, {status: 503});
  }

  if (!isPacketDataFromApiIncludingSource(requestData)) {
    return Response.json({}, {status: 400});
  }

  return null;
};
