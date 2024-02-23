import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonProductionSingleProps} from '@/components/shared/pokemon/production/single/type';
import {ProductionContent} from '@/components/shared/production/rate/content';


export const PokemonProductionSingleAtTotal = ({
  infoAtTotal,
  dailyTotalEnergy,
}: Pick<PokemonProductionSingleProps, 'infoAtTotal' | 'dailyTotalEnergy'>) => {
  return (
    <Flex noFullWidth className="items-end gap-0.5">
      {infoAtTotal}
      <ProductionContent key="dailyTotal" dailyRate={dailyTotalEnergy} isEnergy/>
    </Flex>
  );
};
