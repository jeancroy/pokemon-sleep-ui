import {getPacketRecordingSettings} from '@/controller/packet/settings';
import {PacketDataCommonProps, PacketDataFromApiCommonProps} from '@/types/packet/common';
import {PacketRecordingType} from '@/types/packet/settings';


export const isPacketRecordingEnabled = async (type: PacketRecordingType): Promise<boolean> => {
  const settings = await getPacketRecordingSettings();

  return !!settings && !!settings.enabled[type];
};

export const isPacketDataFromApiIncludingSource = <
  TData extends PacketDataCommonProps,
  TDataFromApi extends PacketDataFromApiCommonProps<TData>
>({source}: TDataFromApi): boolean => {
  return !!source;
};
