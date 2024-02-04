import React from 'react';

import {getRecipeLevelData} from '@/controller/recipeLevel';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {RecipeLevelDataTable} from '@/ui/info/recipeLevel/table/main';


export const RecipeLevelInfo = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const recipeLevelData = await getRecipeLevelData();

  return (
    <PublicPageLayout locale={locale}>
      <RecipeLevelDataTable recipeLevelData={recipeLevelData}/>
    </PublicPageLayout>
  );
};
