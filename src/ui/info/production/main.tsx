import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {Flex} from '@/components/layout/flex/common';
import {getPokemonProducingParamsMeta} from '@/controller/pokemon/producingMeta';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {ProducingParamsClient} from '@/ui/info/production/client/main';
import {ProducingParamsMeta} from '@/ui/info/production/meta/main';
import {ProducingParamsNotice} from '@/ui/info/production/notice';


export const ProducingParams = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    producingParamsMeta,
  ] = await Promise.all([
    getPokemonProducingParamsMeta(),
  ]);

  return (
    <PublicPageLayout locale={locale}>
      <Flex className="gap-2">
        <ProducingParamsNotice/>
        <ProducingParamsMeta meta={producingParamsMeta}/>
        <AdsUnit hideIfNotBlocked/>
        <I18nProvider locale={locale} namespaces={[
          'Game',
          'UI.Component.PokemonFilter',
          'UI.Metadata',
          'UI.Pokemon',
        ]}>
          <ProducingParamsClient/>
        </I18nProvider>
      </Flex>
    </PublicPageLayout>
  );
};
