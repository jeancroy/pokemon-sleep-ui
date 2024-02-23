import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonProductionProps} from '@/components/shared/pokemon/production/type';
import {ProductionContent} from '@/components/shared/production/rate/content';
import {ProductionByCalculatedStates} from '@/types/game/producing/rate/base';
import {Dimension} from '@/types/style';
import {toSum} from '@/utils/array';


type Props = PokemonProductionProps & {
  rates: ProductionByCalculatedStates[],
  getIcon: (rate: ProductionByCalculatedStates, dimension: Dimension) => React.ReactNode,
};

export const PokemonProductionMultiple = ({horizontal, hideFrequency, rates, getIcon}: Props) => {
  const totalDaily = toSum(rates.map(({strength}) => strength.equivalent));

  return (
    <Flex direction={horizontal ? 'row' : 'col'} wrap className={clsx(
      'gap-1',
      horizontal ? 'items-center justify-end' : 'items-end justify-center',
    )}>
      {!hideFrequency && <PokemonFrequency frequency={rates.at(0)?.frequency.equivalent ?? NaN}/>}
      {rates.map((rate) => (
        <ProductionContent
          key={rate.id}
          dailyRate={rate.qty.equivalent}
          getIcon={(dimension) => getIcon(rate, dimension)}
        />
      ))}
      <ProductionContent dailyRate={totalDaily} isEnergy/>
    </Flex>
  );
};
