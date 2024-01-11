import {getPacketRecordingSettings} from '@/controller/packet/settings';
import {PacketRecordingType} from '@/types/packet/settings';


export const isPacketRecordingEnabled = async (type: PacketRecordingType): Promise<boolean> => {
  const settings = await getPacketRecordingSettings();

  return !!settings && !!settings.enabled[type];
};
