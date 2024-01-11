import {PacketRecordingSettings, PacketRecordingType} from '@/types/packet/settings';


export const defaultPacketRecordingSettings: PacketRecordingSettings = {
  enabled: {
    lotteryInfo: true,
    updateData: true,
  },
};

export const packetRecordingSettingsText: {[type in PacketRecordingType]: string} = {
  lotteryInfo: 'Lottery Info (lotif)',
  updateData: 'Update Data (UD)',
};
