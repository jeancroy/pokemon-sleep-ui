'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useUserActivation} from '@/hooks/userData/activation';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {MealInfo} from '@/ui/meal/page/content/info/main';
import {MealPageContent} from '@/ui/meal/page/content/main';
import {MealCommonProps, MealServerDataProps} from '@/ui/meal/page/type';


export const MealClient = (props: MealServerDataProps) => {
  const serverData = useCommonServerData();
  const {serverConfigBundle} = serverData;

  const {data} = useSession();
  const {isPremium} = useUserActivation(data);
  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: serverConfigBundle,
      client: data?.user.preloaded,
    },
    ...serverData,
  });

  const commonProps: MealCommonProps = {
    isPremium,
    calculatedConfigBundle,
    ...props,
  };

  return (
    <Flex center className="gap-1.5">
      <MealInfo {...commonProps}/>
      <AdsUnit hideIfNotBlocked/>
      <MealPageContent {...commonProps}/>
    </Flex>
  );
};
