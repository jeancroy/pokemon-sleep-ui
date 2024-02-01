import React from 'react';

import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getExpShardConsumption} from '@/controller/pokemon/xpShard';
import {getPokemonExpValueMap} from '@/controller/pokemon/xpValue';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokemonExpCalculatorClient} from '@/ui/xp/client';
import {PokemonExpCalculatorDataProps} from '@/ui/xp/type';


export const PokemonExpCalculator = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const [
    pokedexMap,
    xpValueData,
    xpShardConsumption,
  ] = await Promise.all([
    getPokedexMap(),
    getPokemonExpValueMap(),
    getExpShardConsumption(),
  ]);

  const maxLevel = Object.values(xpValueData).at(0)?.data.length;

  if (!maxLevel) {
    return <Failed text="XP Data"/>;
  }

  if (!xpShardConsumption) {
    return <Failed text="XP Shard Consumption"/>;
  }

  const props: PokemonExpCalculatorDataProps = {
    pokedexMap,
    xpValueData,
    xpShardConsumption,
    maxLevel,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Pokedex.Info',
        'UI.InPage.PokemonExp',
      ]}>
        <PokemonExpCalculatorClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
