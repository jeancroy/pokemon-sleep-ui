import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientMap} from '@/controller/ingredient';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PotInfoClient} from '@/ui/info/pot/client';
import {PotInfoDataProps} from '@/ui/info/pot/type';
import {createConfigBundle} from '@/utils/user/config/create';


export const PotInfo = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    recipeLevelData,
    ingredientMap,
    configRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getRecipeLevelData(),
    getIngredientMap(),
    getConfigRequiredData(),
  ]);

  const props: PotInfoDataProps = {
    recipeLevelData,
    ingredientMap,
    preloaded: createConfigBundle(session),
    ...configRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.MealFilter',
        'UI.InPage.Cooking',
        'UI.InPage.Info.Pot',
      ]}>
        <PotInfoClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
