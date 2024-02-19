import {getPacketRecordingConfig} from '@/controller/packet/config';
import {PacketDataCommonProps, PacketDataFromApiCommonProps} from '@/types/packet/common';
import {PacketRecordingType} from '@/types/packet/config';


export const isPacketRecordingEnabled = async (type: PacketRecordingType): Promise<boolean> => {
  const config = await getPacketRecordingConfig();

  return !!config && !!config.enabled[type];
};

export const isPacketDataFromApiIncludingSource = <
  TData extends PacketDataCommonProps,
  TDataFromApi extends PacketDataFromApiCommonProps<TData>
>({source}: TDataFromApi): boolean => {
  return !!source;
};
