'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {BerryFavoriteInfoUI} from '@/ui/berry/page/favoriteInfo';
import {BerryMeta} from '@/ui/berry/page/meta';
import {BerryProductionsOfPokemon} from '@/ui/berry/page/pokemon';
import {BerryStrengthInfo} from '@/ui/berry/page/strengthInfo';
import {BerryPageDataProps} from '@/ui/berry/page/type';


export const BerryPageClient = (props: BerryPageDataProps) => {
  return (
    <Flex className="gap-1.5">
      <Flex className="gap-1.5 lg:flex-row">
        <BerryMeta {...props}/>
        <AdsUnit className="lg:hidden"/>
        <BerryFavoriteInfoUI {...props}/>
      </Flex>
      <AdsUnit/>
      <BerryStrengthInfo {...props}/>
      <AdsUnit hideIfNotBlocked/>
      <BerryProductionsOfPokemon {...props}/>
    </Flex>
  );
};
