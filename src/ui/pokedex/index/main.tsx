import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getPokemonList} from '@/controller/pokemon/info';
import {getSleepStyleNormalMap} from '@/controller/sleepStyle';
import {userDataPokedex} from '@/controller/user/manager';
import {locales} from '@/types/next/locale';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokedexClient} from '@/ui/pokedex/index/client';
import {PokedexData, PokedexDataProps, PokemonInfoForPokedex} from '@/ui/pokedex/index/type';
import {getI18nTranslator, isLocale} from '@/utils/i18n';


const getPokedexData = async (): Promise<PokedexData> => {
  const sleepStyleMap = await getSleepStyleNormalMap();
  const translators = await Promise.all(
    locales
      .filter(isLocale)
      .map((locale) => getI18nTranslator({locale, namespace: 'Game.PokemonName'})),
  );

  return (await getPokemonList())
    .map((pokemon) => ({
      ...pokemon,
      sleepStyles: sleepStyleMap[pokemon.id] ?? [],
      nameOfAllLocale: translators.map((t) => t(pokemon.id.toString())),
    } satisfies PokemonInfoForPokedex));
};

export const Pokedex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    pokedexData,
    pokemonMaxLevel,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexData(),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: PokedexDataProps = {
    pokedexData,
    pokemonMaxLevel,
    preloaded: {
      display: (await userDataPokedex.getDataOptional(session?.user.id))?.data,
    },
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.PokemonFilter',
        'UI.Metadata',
        'UI.Pokemon',
      ]}>
        <PokedexClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
