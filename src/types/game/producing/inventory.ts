import {SleepSessionData} from '@/types/game/sleep';


export type CarryLimitInfo = {
  base: number, // Pokémon base + evolution count
  final: number, // Base + subskill bonus
};

export type FullPackStatsData<T> = {
  vacant: T,
  filled: T,
};

export type FullPackStatsOfSleep = {
  helpCount: FullPackStatsData<number>,
  duration: FullPackStatsData<number>,
};

export type FullPackStats = {
  bySleep: SleepSessionData<FullPackStatsOfSleep | null>,
};
