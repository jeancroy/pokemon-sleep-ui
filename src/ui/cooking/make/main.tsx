import React from 'react';

import {I18nProvider} from '@/components/i18n/provider';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealMakerClient} from '@/ui/cooking/make/client';


export const MealMaker = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game.MealType',
        'Game.Food',
        'UI.Component.MealFilter',
        'UI.InPage.Cooking',
      ]}>
        <MealMakerClient/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
