import React from 'react';


import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {userDataPokeboxDisplay} from '@/controller/user/manager';
import {DefaultPageProps} from '@/types/next/page/common';
import {LoginRequiredPageLayout} from '@/ui/base/layout/loginRequired';
import {PokeboxClient} from '@/ui/team/pokebox/client/main';
import {PokeboxServerDataProps} from '@/ui/team/pokebox/type';


const Pokebox = async () => {
  const [
    session,
    pokemonMaxLevel,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: PokeboxServerDataProps = {
    preloaded: {
      display: (await userDataPokeboxDisplay.getDataOptional(session?.user.id))?.data,
    },
    pokemonMaxLevel,
  };

  return <PokeboxClient {...props}/>;
};

export const PokeboxEntry = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <LoginRequiredPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.PokemonFilter',
        'UI.InPage.Team',
        'UI.Metadata',
        'UI.Pokemon',
        'UI.Producing',
        'UI.Rating',
      ]}>
        <Pokebox/>
      </I18nProvider>
    </LoginRequiredPageLayout>
  );
};
