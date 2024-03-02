import React from 'react';


import {I18nProvider} from '@/components/i18n/provider';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokedexTierListClient} from '@/ui/pokedex/tier/client';
import {PokedexTierListDataProps} from '@/ui/pokedex/tier/type';


export const PokedexTierList = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const [
    pokemonMaxLevel,
  ] = await Promise.all([
    getPokemonMaxLevelByBerry(),
  ]);

  const props: PokedexTierListDataProps = {
    pokemonMaxLevel,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Metadata',
        'UI.InPage.Pokedex',
        'UI.Pokemon',
      ]}>
        <PokedexTierListClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
