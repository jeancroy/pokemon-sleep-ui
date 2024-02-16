import {TimePeriodPosition} from '@/types/game/timePeriod';


export type CountdownCommonProps = {
  className?: string,
};

export type CountdownState = 'toOpen' | 'openingSoon' | 'open' | 'endingSoon' | 'ended' | 'closingSoon';

export type CountdownExpiryData = {
  expiry: Date,
  timePeriodPosition: TimePeriodPosition,
  durationSecs: number,
};

export type CountdownData = {
  state: CountdownState,
};
