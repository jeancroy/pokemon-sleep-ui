import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getTeamMemberViewRequiredData} from '@/controller/dataBundle/teamMemberView';
import {getFieldMetaMap} from '@/controller/mapMeta';
import {getUserProductionComparisonContent} from '@/controller/user/productionComparison/main';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {ProductionComparisonClient} from '@/ui/production/client/main';
import {ProductionComparisonDataProps} from '@/ui/production/type';
import {createConfigBundle} from '@/utils/user/config/create';


export const ProductionComparison = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const session = await getServerSession(authOptions);
  const [
    fieldMetaMap,
    userProductionComparisonContent,
    teamMemberViewRequiredData,
  ] = await Promise.all([
    getFieldMetaMap(),
    getUserProductionComparisonContent(session?.user.id),
    getTeamMemberViewRequiredData(),
  ]);

  const props: ProductionComparisonDataProps = {
    fieldMetaMap,
    ...teamMemberViewRequiredData,
    preloaded: {
      bundle: createConfigBundle(session),
      setup: userProductionComparisonContent,
    },
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.Collapsible',
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
        <ProductionComparisonClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
