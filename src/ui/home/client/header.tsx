import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';

import {Flex} from '@/components/layout/flex/common';
import {HomePokeball} from '@/ui/home/client/pokeball';
import {HomeUserCount} from '@/ui/home/client/userCount';
import {HomeDataProps} from '@/ui/home/type';


export const HomeHeader = ({userCount, paidUserCount}: HomeDataProps) => {
  return (
    <Flex className="relative">
      <HomePokeball/>
      <Flex direction="row" className="absolute bottom-0 items-end justify-between">
        <HomeUserCount icon={<CurrencyDollarIcon className="size-6"/>} userCount={paidUserCount}/>
        <HomeUserCount icon={<UsersIcon className="size-6"/>} userCount={userCount}/>
      </Flex>
    </Flex>
  );
};
