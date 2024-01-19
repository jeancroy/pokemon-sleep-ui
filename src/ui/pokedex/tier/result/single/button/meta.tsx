import React from 'react';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {PokedexTierListSingleCommonProps} from '@/ui/pokedex/tier/result/single/type';


export const PokedexTierListTierMeta = ({tier, bucket}: PokedexTierListSingleCommonProps) => {
  return (
    <Flex center noFullWidth className="gap-1 md:flex-row md:gap-0">
      <Flex center noFullWidth className="h-12 w-12 text-4xl lg:text-5xl">
        {tier}
      </Flex>
      <InfoIcon dimension="h-7 w-7" classTextSize="text-base">
        {bucket.length}
      </InfoIcon>
    </Flex>
  );
};
