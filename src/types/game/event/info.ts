import {EventId} from '@/types/game/event/common';
import {TimePeriod} from '@/types/game/timePeriod';


export type EventIdentifier = `${string}-${string}-${string}`;

export type EventInfo = TimePeriod & {
  eventIdentifier: EventIdentifier,
  associatedInternalId: EventId[],
  i18nKey: {
    name: string,
    short: {[eventInternalId in EventId]: string},
  },
  eventPeriod: {[eventInternalId in EventId]: TimePeriod},
};
