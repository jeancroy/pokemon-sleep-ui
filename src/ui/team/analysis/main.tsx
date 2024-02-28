import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getTeamMemberViewRequiredData} from '@/controller/dataBundle/teamMemberView';
import {getFieldMetaMap} from '@/controller/mapMeta';
import {getSnorlaxData} from '@/controller/snorlax';
import {getUserTeamAnalysisContent} from '@/controller/user/teamAnalysis/merged';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {TeamAnalysisClient} from '@/ui/team/analysis/client';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {createConfigBundle} from '@/utils/user/config/create';


export const TeamAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const session = await getServerSession(authOptions);

  const [
    snorlaxData,
    mapMeta,
    userTeamAnalysisContent,
    teamMemberViewRequiredData,
  ] = await Promise.all([
    getSnorlaxData(),
    getFieldMetaMap(),
    getUserTeamAnalysisContent(session?.user.id),
    getTeamMemberViewRequiredData(),
  ]);

  const props: TeamAnalysisServerDataProps = {
    snorlaxData,
    fieldMetaMap: mapMeta,
    preloaded: {
      bundle: createConfigBundle(session),
      setup: userTeamAnalysisContent,
    },
    ...teamMemberViewRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.Collapsible',
        'UI.Component.MealCoverageCombo',
        'UI.Component.Team',
        'UI.InPage.Cooking',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
        'UI.Metadata',
        'UI.MainSkill.EffectType',
        'UI.Producing',
        'UI.Stamina',
        'UI.Rating',
        'UI.UserConfig',
      ]}>
        <TeamAnalysisClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
