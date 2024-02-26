import React from 'react';


import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {ProductionComparisonClient} from '@/ui/production/client';


export const ProductionComparison = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PublicPageLayout locale={locale}>
      <ProductionComparisonClient/>
    </PublicPageLayout>
  );
};
