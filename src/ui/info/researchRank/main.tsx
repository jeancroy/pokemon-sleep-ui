import React from 'react';

import {I18nProvider} from '@/components/i18n/provider';
import {getDreamClusterDataList} from '@/controller/dreamCluster';
import {getResearchRankData} from '@/controller/researchRank';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {ResearchRankInfoContent} from '@/ui/info/researchRank/content';
import {ResearchRankInfoDataProps} from '@/ui/info/researchRank/type';


export const ResearchRankInfo = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    dreamClusterData,
    researchRankData,
  ] = await Promise.all([
    getDreamClusterDataList(),
    getResearchRankData(),
  ]);

  const props: ResearchRankInfoDataProps = {
    dreamClusterData,
    researchRankData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Info.ResearchRank',
      ]}>
        <ResearchRankInfoContent {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
