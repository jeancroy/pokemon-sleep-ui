import React from 'react';

import {I18nProvider} from '@/components/i18n/provider';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {RecipeLevelInfoClient} from '@/ui/info/recipeLevel/client';
import {RecipeLevelInfoDataProps} from '@/ui/info/recipeLevel/type';


export const RecipeLevelInfo = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const recipeLevelData = await getRecipeLevelData();

  const props: RecipeLevelInfoDataProps = {
    recipeLevelData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'UI.InPage.Info.RecipeLevel',
      ]}>
        <RecipeLevelInfoClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
