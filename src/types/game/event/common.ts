import {TimePeriod} from '@/types/game/timePeriod';


export type EventId = number;

export type EventCommonData = TimePeriod & {
  internalId: number,
  eventId: number,
};
