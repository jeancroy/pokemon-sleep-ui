import {FilterInclusionMap} from '@/components/input/filter/type';


export const packetRecordingType = [
  'lotteryInfo',
  'updatePokemonData',
] as const;

export type PacketRecordingType = typeof packetRecordingType[number];

export type PacketRecordingSettings = {
  enabled: FilterInclusionMap<PacketRecordingType>,
};
