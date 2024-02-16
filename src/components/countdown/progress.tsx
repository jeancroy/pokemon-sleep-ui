import React from 'react';

import {countdownProgressStyling} from '@/components/countdown/const';
import {CountdownState} from '@/components/countdown/type';
import {ProgressBarSingle} from '@/components/progressBar/single';


type Props = {
  secsLeft: number,
  durationSecs: number,
  state: CountdownState,
};

export const CountdownProgress = ({secsLeft, durationSecs, state}: Props) => {
  return (
    <ProgressBarSingle
      percent={secsLeft / durationSecs * 100}
      classBar={countdownProgressStyling[state]}
      classBarHeight="h-1.5"
    />
  );
};
