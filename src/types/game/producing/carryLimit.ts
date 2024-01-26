import {SleepSessions} from '@/types/game/sleep';


export type CarryLimitInfo = {
  base: number, // Pokémon base + evolution count
  final: number, // Base + subskill bonus
};

export type TimeToFullPack = SleepSessions<number | null>;

export type FullPackStats = {
  secondsToFull: TimeToFullPack,
};
