import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {EncounterCalculatorClient} from '@/ui/encounter/client';
import {EncounterCalculatorDataProps} from '@/ui/encounter/type';


export const EncounterCalculator = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const props: EncounterCalculatorDataProps = {

  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[]}>
        <AdsUnit/>
        <EncounterCalculatorClient {...props}/>
        <AdsUnit/>
      </I18nProvider>
    </PublicPageLayout>
  );
};