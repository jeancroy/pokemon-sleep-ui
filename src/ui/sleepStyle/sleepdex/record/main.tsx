import React from 'react';

import {getServerSession} from 'next-auth';

import {SignIn} from '@/components/auth/signIn';
import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getPokemonList} from '@/controller/pokemon/info';
import {getSleepdexMap} from '@/controller/sleepdex';
import {getSleepStyleNormalMap} from '@/controller/sleepStyle';
import {getSleepStyleSpecialMap} from '@/controller/sleepStyleSpecial';
import {DefaultPageProps} from '@/types/next/page/common';
import {LoginRequiredPageLayout} from '@/ui/base/layout/loginRequired';
import {SleepdexRecordClient} from '@/ui/sleepStyle/sleepdex/record/client';
import {SleepdexRecordDataProps} from '@/ui/sleepStyle/sleepdex/record/type';


export const SleepdexRecord = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const session = await getServerSession(authOptions);

  if (!session) {
    return <SignIn/>;
  }

  const [
    pokemonList,
    sleepStyleMap,
    sleepStyleSpecialMap,
    sleepdex,
  ] = await Promise.all([
    getPokemonList(),
    getSleepStyleNormalMap(),
    getSleepStyleSpecialMap(),
    getSleepdexMap(session.user.id),
  ]);

  const props: SleepdexRecordDataProps = {
    pokemonList,
    sleepStyleMap,
    sleepStyleSpecialMap,
    preloaded: {
      sleepdex,
    },
  };

  return (
    <LoginRequiredPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.Metadata']}>
        <SleepdexRecordClient {...props}/>
      </I18nProvider>
    </LoginRequiredPageLayout>
  );
};
