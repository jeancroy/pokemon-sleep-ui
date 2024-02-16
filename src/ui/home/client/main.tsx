'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {useNavEntries} from '@/hooks/nav';
import {HomeEventList} from '@/ui/home/client/event';
import {HomeHeader} from '@/ui/home/client/header';
import {HomeDataProps} from '@/ui/home/type';


export const HomeClient = (props: HomeDataProps) => {
  const t = useTranslations('UI.Metadata');
  const entries = useNavEntries();

  return (
    <Flex className="gap-2 md:h-full md:px-10">
      <HomeHeader {...props}/>
      <HomeEventList {...props}/>
      <AdsUnit hideIfNotBlocked/>
      <Flex direction="row" center wrap className="h-auto gap-2">
        {entries.map((opts) => {
          const {i18nTextId} = opts;

          // `showInHome` being `undefined` (falsy) should be treated as `true`
          if (opts.type === 'link' && opts.showInHome === false) {
            return null;
          }

          return (
            <div key={i18nTextId} className="width-with-gap md:width-with-gap-2-items">
              <FeatureLinkImage text={t(i18nTextId)} {...opts}/>
            </div>
          );
        })}
      </Flex>
    </Flex>
  );
};
