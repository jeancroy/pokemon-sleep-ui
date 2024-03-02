import React from 'react';


import {I18nProvider} from '@/components/i18n/provider';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokedexTierListClient} from '@/ui/pokedex/tier/client';


export const PokedexTierList = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Metadata',
        'UI.InPage.Pokedex',
        'UI.Pokemon',
      ]}>
        <PokedexTierListClient/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
