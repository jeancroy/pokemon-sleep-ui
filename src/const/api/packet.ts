import {PacketRecordingConfig, PacketRecordingType} from '@/types/packet/config';


export const defaultPacketRecordingConfig: PacketRecordingConfig = {
  enabled: {
    lotteryInfo: true,
    updatePokemonData: true,
  },
};

export const packetRecordingSettingsText: {[type in PacketRecordingType]: string} = {
  lotteryInfo: 'Lottery Info (lotif)',
  updatePokemonData: 'Update Data / Pokemon (UD.pokemon.upd)',
};
