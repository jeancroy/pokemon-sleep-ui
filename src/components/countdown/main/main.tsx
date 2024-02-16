'use client';
import React from 'react';

import {CountdownContent} from '@/components/countdown/main/content';
import {CountdownCommonProps} from '@/components/countdown/type';
import {getCountdownExpiryData} from '@/components/countdown/utils';
import {TimePeriodInDate} from '@/types/game/timePeriod';


type Props = CountdownCommonProps & {
  timePeriodInDate: TimePeriodInDate,
};

export const Countdown = ({timePeriodInDate, ...props}: Props) => {
  const expiryData = getCountdownExpiryData(timePeriodInDate);
  if (!expiryData) {
    return null;
  }

  return <CountdownContent expiryData={expiryData} {...props}/>;
};
