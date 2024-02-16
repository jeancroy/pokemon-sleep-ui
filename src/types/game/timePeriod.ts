import {Nullable} from '@/utils/type';


export type TimePeriod = {
  startEpoch: number,
  endEpoch: number,
  closeEpoch?: Nullable<number>,
};

export type TimePeriodInDate = {
  start: Date,
  end: Date,
  close: Nullable<Date>,
};

export type TimePeriodPosition = 'closed' | 'ended' | 'current' | 'future';
