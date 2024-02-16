'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useTimer} from 'react-timer-hook';

import {countdownShowProgress, countdownTextStyling} from '@/components/countdown/const';
import {CountdownProgress} from '@/components/countdown/progress';
import {CountdownCommonProps, CountdownExpiryData} from '@/components/countdown/type';
import {getCurrentCountdownData} from '@/components/countdown/utils';
import {Flex} from '@/components/layout/flex/common';
import {padTimeUnit} from '@/utils/number/format/pad';


type Props = CountdownCommonProps & {
  expiryData: CountdownExpiryData,
};

export const CountdownContent = ({className, expiryData}: Props) => {
  const {expiry, timePeriodPosition, durationSecs} = expiryData;

  const {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
  } = useTimer({
    expiryTimestamp: expiry,
  });

  const data = getCurrentCountdownData({
    timePeriodPosition,
    secsLeft: totalSeconds,
  });
  if (!data) {
    return null;
  }

  const {state} = data;

  return (
    <Flex center className={clsx('gap-1', className)}>
      <code className={clsx('leading-none', countdownTextStyling[state])}>
        {`${days}:${padTimeUnit(hours)}:${padTimeUnit(minutes)}:${padTimeUnit(seconds)}`}
      </code>
      {
        countdownShowProgress[state] &&
        <CountdownProgress durationSecs={durationSecs} secsLeft={totalSeconds} state={state}/>
      }
    </Flex>
  );
};
