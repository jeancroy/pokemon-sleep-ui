import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {Flex} from '@/components/layout/flex/common';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getPokemonList} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getPokemonProducingParamsMeta} from '@/controller/pokemon/producingMeta';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {ProducingParamsClient} from '@/ui/info/production/client/main';
import {ProducingParamsMeta} from '@/ui/info/production/meta/main';
import {ProducingParamsNotice} from '@/ui/info/production/notice';
import {ProducingParamsDataProps} from '@/ui/info/production/type';


export const ProducingParams = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    pokemonList,
    producingParamsMap,
    producingParamsMeta,
    ingredientMap,
    ingredientChainMap,
  ] = await Promise.all([
    getPokemonList(),
    getPokemonProducingParamsMap(),
    getPokemonProducingParamsMeta(),
    getIngredientMap(),
    getIngredientChainMap(),
  ]);

  const props: ProducingParamsDataProps = {
    pokemonList,
    producingParamsMap,
    ingredientMap,
    ingredientChainMap,
  };

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
          'UI.InPage.Pokedex',
        ]}>
          <ProducingParamsClient {...props}/>
        </I18nProvider>
      </Flex>
    </PublicPageLayout>
  );
};
