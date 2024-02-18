import {SleepSessionData} from '@/types/game/sleep';


export type CarryLimitInfo = {
  base: number, // Pokémon base + evolution count
  final: number, // Base + subskill bonus
};

export type FullPackStatsOfSleep = {
  helpCount: number,
  secsToFull: number,
};

export type FullPackStats = {
  bySleep: SleepSessionData<FullPackStatsOfSleep | null>,
};
