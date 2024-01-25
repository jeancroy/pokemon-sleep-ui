import React from 'react';

import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {pokedexTierTextStyling} from '@/ui/pokedex/tier/result/const';
import {PokedexTierListSingleCommonProps} from '@/ui/pokedex/tier/result/single/type';


export const PokedexTierListTierMeta = ({tier, bucket}: PokedexTierListSingleCommonProps) => {
  return (
    <Flex center noFullWidth className="gap-1 md:flex-row md:gap-0">
      <Flex center noFullWidth className={clsx(
        'transform-smooth size-12 text-4xl lg:text-5xl',
        pokedexTierTextStyling[tier],
      )}>
        {tier}
      </Flex>
      <InfoIcon dimension="size-7" classTextSize="text-base">
        {bucket.length}
      </InfoIcon>
    </Flex>
  );
};
