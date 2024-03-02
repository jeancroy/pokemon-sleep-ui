import React from 'react';


import {I18nProvider} from '@/components/i18n/provider';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealIndexClient} from '@/ui/meal/index/client';


export const MealIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.MealFilter',
        'UI.InPage.Cooking',
      ]}>
        <MealIndexClient/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
