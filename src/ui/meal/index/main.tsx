import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllMeals} from '@/controller/meal';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealIndexClient} from '@/ui/meal/index/client';


export const MealIndex = () => {
  const data = React.use(getAllMeals());
  const session = React.use(getServerSession(authOptions));

  return (
    <PublicPageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Cooking']}>
        <MealIndexClient data={data} session={session}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
