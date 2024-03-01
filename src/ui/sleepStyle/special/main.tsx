import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getSleepdexMap} from '@/controller/sleepdex';
import {getSleepStyleSpecialMap} from '@/controller/sleepStyleSpecial';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {SleepStyleSpecialClient} from '@/ui/sleepStyle/special/client';
import {SleepStyleSpecialServerDataProps} from '@/ui/sleepStyle/special/type';


export const SleepStyleSpecial = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const session = await getServerSession(authOptions);
  const [
    pokedexMap,
    sleepdexMap,
    sleepStyleSpecialMap,
  ] = await Promise.all([
    getPokedexMap(),
    getSleepdexMap(session?.user.id),
    getSleepStyleSpecialMap(),
  ]);

  const props: SleepStyleSpecialServerDataProps = {
    pokedexMap,
    sleepStyleSpecialMap,
    sleepdexMap,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Metadata',
        'UI.SleepStyle',
      ]}>
        <SleepStyleSpecialClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
