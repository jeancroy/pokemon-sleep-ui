import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonProductionSingleProps} from '@/components/shared/pokemon/production/single/type';
import {ProductionUI} from '@/components/shared/production/rate/main';
import {toProductionOfState} from '@/utils/game/producing/convert';


export const PokemonProductionSingleAtItem = ({
  hideFrequency,
  rate,
  getIcon,
  state = 'equivalent',
}: Pick<PokemonProductionSingleProps, 'hideFrequency' | 'rate' | 'getIcon' | 'state'>) => (
  <Flex noFullWidth className="items-end gap-0.5">
    {!hideFrequency && <PokemonFrequency frequency={rate?.frequency[state] ?? NaN}/>}
    <ProductionUI
      rate={rate && toProductionOfState({rate, state})}
      getIcon={getIcon}
    />
  </Flex>
);
