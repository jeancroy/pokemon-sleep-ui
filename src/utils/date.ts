import {formatISO} from 'date-fns';

import {IsoDateString, IsoTimestampString} from '@/types/date';


export const toIsoDateString = (date: Date): IsoDateString => date.toISOString().slice(0, 10) as IsoDateString;

export const toIsoTimestampString = (date: Date): IsoTimestampString => (
  date.toISOString().slice(0, -1) as IsoTimestampString
);

export const toLocalIsoTimestampString = (timestamp: IsoTimestampString | null): IsoTimestampString | null => {
  if (!timestamp) {
    return null;
  }

  return formatISO(new Date(`${timestamp}Z`)).slice(0, 19) as IsoTimestampString;
};

export const toUtcIsoTimestampString = (timestamp: string): IsoTimestampString => {
  try {
    return toIsoTimestampString(new Date(timestamp)) as IsoTimestampString;
  } catch (e) {
    return toIsoTimestampString(new Date()) as IsoTimestampString;
  }
};

export const getDateFromEpochSecAtLocal = (epochSecAtLocal: number): Date => {
  if (typeof window === 'undefined') {
    throw new Error(
      'To ensure conversion correctness, `getDateFromEpochSecAtLocal()` can only run at client side.',
    );
  }

  const dateAtUtc = new Date(epochSecAtLocal * 1000);

  return new Date(dateAtUtc.getTime() + dateAtUtc.getTimezoneOffset() * 60 * 1000);
};
