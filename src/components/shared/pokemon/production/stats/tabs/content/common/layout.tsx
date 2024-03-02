import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';


export const PokemonDetailedProductionTabLayout = ({children}: React.PropsWithChildren) => {
  return (
    <Flex className="gap-1">
      {children}
      <AdsUnit/>
    </Flex>
  );
};
