import {StrengthMultiplier} from '@/types/game/bonus/strength';
import {EventCommonData} from '@/types/game/event/common';


export type EventStrengthMultiplierEntry = EventCommonData & StrengthMultiplier;

export type EventStrengthMultiplierData = {
  current: EventStrengthMultiplierEntry | null,
};
