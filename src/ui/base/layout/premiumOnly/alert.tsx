import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PremiumOnlyNotice} from '@/components/static/premium/notice';


export const PremiumOnlyPageAlert = () => {
  return (
    <Flex center className="h-[30vh] text-xl text-rose-600 dark:text-rose-500">
      <PremiumOnlyNotice hideIcon style="section"/>
    </Flex>
  );
};
