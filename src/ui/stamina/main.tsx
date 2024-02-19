import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {defaultStaminaCalcConfig} from '@/const/user/config/user';
import {getStaminaCookingRecoveryData} from '@/controller/cookingRecovery';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {StaminaAnalysisClient} from '@/ui/stamina/client';
import {StaminaAnalysisDataProps} from '@/ui/stamina/type';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const StaminaAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    subSkillMap,
    cookingRecoveryData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getSubSkillMap(),
    getStaminaCookingRecoveryData(),
  ]);

  const props: StaminaAnalysisDataProps = {
    subSkillMap,
    cookingRecoveryData,
    preloaded: {
      config: cloneMerge(
        defaultStaminaCalcConfig,
        session?.user.preloaded.userConfig?.stamina,
      ),
    },
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.Common', 'UI.Stamina', 'UI.InPage.Team']}>
        <StaminaAnalysisClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
