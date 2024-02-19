import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/production/type';
import {ProducingRateContent} from '@/components/shared/production/rate/content';
import {ProducingRateByCalculatedStates} from '@/types/game/producing/rate';
import {Dimension} from '@/types/style';
import {toSum} from '@/utils/array';


type Props = PokemonProducingRateProps & {
  rates: ProducingRateByCalculatedStates[],
  getIcon: (rate: ProducingRateByCalculatedStates, dimension: Dimension) => React.ReactNode,
};

export const PokemonProducingRateMultiple = ({horizontal, hideFrequency, rates, getIcon}: Props) => {
  const totalDaily = toSum(rates.map(({strength}) => strength.equivalent));

  return (
    <Flex direction={horizontal ? 'row' : 'col'} wrap className={clsx(
      'gap-1',
      horizontal ? 'items-center justify-end' : 'items-end justify-center',
    )}>
      {!hideFrequency && <PokemonFrequency frequency={rates.at(0)?.frequency.equivalent ?? NaN}/>}
      {rates.map((rate) => (
        <ProducingRateContent
          key={rate.id}
          dailyRate={rate.qty.equivalent}
          getIcon={(dimension) => getIcon(rate, dimension)}
        />
      ))}
      <ProducingRateContent dailyRate={totalDaily} isEnergy/>
    </Flex>
  );
};
