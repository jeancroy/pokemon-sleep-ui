import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getUserSettingsRequiredData} from '@/controller/dataBundle/settings';
import {getIngredientMap} from '@/controller/ingredient';
import {getRecipeLevelData} from '@/controller/recipeLevel';
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
    recipeLevelData,
    userSettingsRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getIngredientMap(),
    getRecipeLevelData(),
    getUserSettingsRequiredData(),
  ]);

  const props: MealDataProps = {
    ingredientMap,
    recipeLevelData,
    preloaded: createUserSettingsBundle(session),
    ...userSettingsRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.InPage.Cooking']}>
        <MealIndexClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
