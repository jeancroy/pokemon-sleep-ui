import React from 'react';

import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {getExpShardConsumption} from '@/controller/pokemon/xpShard';
import {getPokemonExpValueMap} from '@/controller/pokemon/xpValue';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokemonExpCalculatorClient} from '@/ui/xp/client';
import {PokemonExpCalculatorDataProps} from '@/ui/xp/type';


export const PokemonExpCalculator = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const [
    xpValueData,
    xpShardConsumption,
  ] = await Promise.all([
    getPokemonExpValueMap(),
    getExpShardConsumption(),
  ]);

  const pokemonMaxLevel = Object.values(xpValueData).at(0)?.data.length;

  if (!pokemonMaxLevel) {
    return <Failed text="XP Data"/>;
  }

  if (!xpShardConsumption) {
    return <Failed text="XP Shard Consumption"/>;
  }

  const props: PokemonExpCalculatorDataProps = {
    xpValueData,
    xpShardConsumption,
    pokemonMaxLevel,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.PokemonExp',
        'UI.Pokemon',
      ]}>
        <PokemonExpCalculatorClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
