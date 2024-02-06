import {EventCommonData} from '@/types/game/event/common';


export type EventDrowsyPowerMultiplierEntry = EventCommonData & {
  multiplier: number,
};

export type EventDrowsyPowerMultiplierData = {
  current: EventDrowsyPowerMultiplierEntry | null,
  max: number,
};
