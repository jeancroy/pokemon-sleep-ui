import React from 'react';


import {AnalysisPageParams} from '@/app/[locale]/analysis/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getPokemonList} from '@/controller/pokemon/info';
import {getSleepStyleNormalMap} from '@/controller/sleepStyle';
import {AnalysisPageClient} from '@/ui/analysis/page/client';
import {AnalysisPageServerDataProps} from '@/ui/analysis/page/type';
import {PublicPageLayout} from '@/ui/base/layout/public';


type Props = {
  params: AnalysisPageParams,
};

export const AnalysisPage = async ({params}: Props) => {
  const {id, locale} = params;
  const [
    pokemonList,
    sleepStyleMap,
    pokemonMaxLevel,
  ] = await Promise.all([
    getPokemonList(),
    getSleepStyleNormalMap(),
    getPokemonMaxLevelByBerry(),
  ]);

  const pokemon = pokemonList.find((pokemon) => pokemon.id === Number(id));

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  const props: AnalysisPageServerDataProps = {
    pokemonList,
    pokemon,
    sleepStyleMap,
    pokemonMaxLevel,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.PokemonFilter',
        'UI.InPage.Analysis',
        'UI.Pokemon',
        'UI.Metadata',
      ]}>
        <AnalysisPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
