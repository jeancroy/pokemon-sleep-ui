import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getCookingUserSettingsRequiredData} from '@/controller/dataBundle/cookingSettings';
import {getIngredientMap} from '@/controller/ingredient';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealIndexClient} from '@/ui/meal/index/client';
import {MealDataProps} from '@/ui/meal/index/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


export const MealIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    ingredientMap,
    cookingUserSettingsRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getIngredientMap(),
    getCookingUserSettingsRequiredData(),
  ]);

  const props: MealDataProps = {
    ingredientMap,
    preloaded: createUserSettingsBundle(session),
    ...cookingUserSettingsRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.InPage.Cooking']}>
        <MealIndexClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
