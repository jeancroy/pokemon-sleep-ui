import React from 'react';

import ClockIcon from '@heroicons/react/24/outline/ClockIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonFrequencyProps} from '@/components/shared/pokemon/frequency/type';
import {durationOfDay} from '@/const/common';
import {formatFloat} from '@/utils/number/format/regular';
import {formatSeconds} from '@/utils/time';


type Props = PokemonFrequencyProps & {
  frequency: number,
};

export const PokemonFrequency = ({frequency, noIcon, normalText}: Props) => {
  const dailyCount = durationOfDay / frequency;

  return (
    <Flex direction="row" center noFullWidth className={clsx('gap-0.5', !normalText && 'text-sm')}>
      {!noIcon && <ClockIcon className={normalText ? 'size-5' : 'size-4'}/>}
      <div>{formatSeconds({seconds: frequency})}</div>
      <div>({formatFloat(dailyCount)}x)</div>
    </Flex>
  );
};
