import {StrengthMultiplier} from '@/types/game/bonus/strength';


export type EventStrengthMultiplierEntry = StrengthMultiplier & {
  entryId: number,
  startEpoch: number,
  endEpoch: number,
};

export type EventStrengthMultiplierData = {
  current: EventStrengthMultiplierEntry | null,
};
