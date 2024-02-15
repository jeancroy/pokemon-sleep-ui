'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useUserActivation} from '@/hooks/userData/activation';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {MealInfo} from '@/ui/meal/page/content/info/main';
import {MealPageContent} from '@/ui/meal/page/content/main';
import {MealCommonProps, MealServerDataProps} from '@/ui/meal/page/type';


export const MealClient = (props: MealServerDataProps) => {
  const {preloaded} = props;

  const {data} = useSession();
  const {isPremium} = useUserActivation(data);
  const {translatedSettings, bundle} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    ...props,
  });

  const commonProps: MealCommonProps = {
    isPremium,
    bundle,
    translatedSettings,
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
