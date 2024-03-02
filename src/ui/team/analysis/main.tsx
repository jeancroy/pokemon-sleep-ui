import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getTeamMemberViewRequiredData} from '@/controller/dataBundle/teamMemberView';
import {getSnorlaxData} from '@/controller/snorlax';
import {getUserTeamAnalysisContent} from '@/controller/user/teamAnalysis/merged';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {TeamAnalysisClient} from '@/ui/team/analysis/client';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';


export const TeamAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const session = await getServerSession(authOptions);

  const [
    snorlaxData,
    userTeamAnalysisContent,
    teamMemberViewRequiredData,
  ] = await Promise.all([
    getSnorlaxData(),
    getUserTeamAnalysisContent(session?.user.id),
    getTeamMemberViewRequiredData(),
  ]);

  const props: TeamAnalysisServerDataProps = {
    snorlaxData,
    preloaded: {
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
        'UI.Component.PokemonFilter',
        'UI.Component.Team',
        'UI.InPage.Cooking',
        'UI.Metadata',
        'UI.MainSkill.EffectType',
        'UI.Pokemon',
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
