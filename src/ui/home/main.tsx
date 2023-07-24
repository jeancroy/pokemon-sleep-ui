import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PageLayout} from '@/ui/base/layout';
import {NavEntries} from '@/ui/base/navbar/const';
import {HomePageLink} from '@/ui/home/link';


export const Home = () => {
  const t = useTranslations('UI.Metadata');
  const t2 = useTranslations('UI.InPage.Home');

  return (
    <PageLayout>
      <Flex direction="row" center className="h-20 text-2xl">
        {t2('Welcome')}
      </Flex>
      <Flex direction="row" center wrap className="h-auto md:h-full md:p-10">
        {NavEntries.map(({href, imageSrc, i18nTextId}) => {
          return (
            <div key={i18nTextId} className="width-with-gap md:width-with-gap-2-items">
              <HomePageLink href={href} imageSrc={imageSrc} text={t(i18nTextId)}/>
            </div>
          );
        })}
      </Flex>
    </PageLayout>
  );
};
