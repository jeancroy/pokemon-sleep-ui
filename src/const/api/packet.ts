import {PacketRecordingSettings, PacketRecordingType} from '@/types/packet/settings';


export const defaultPacketRecordingSettings: PacketRecordingSettings = {
  enabled: {
    lotteryInfo: true,
    updatePokemonData: true,
  },
};

export const packetRecordingSettingsText: {[type in PacketRecordingType]: string} = {
  lotteryInfo: 'Lottery Info (lotif)',
  updatePokemonData: 'Update Data / Pokemon (UD.pokemon.upd)',
};
