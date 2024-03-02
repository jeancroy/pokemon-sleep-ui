import React from 'react';

import {I18nProvider} from '@/components/i18n/provider';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {RecipeLevelInfoClient} from '@/ui/info/recipeLevel/client';


export const RecipeLevelInfo = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'UI.InPage.Info.RecipeLevel',
      ]}>
        <RecipeLevelInfoClient/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
