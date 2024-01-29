import React from 'react';

import {getServerSession} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {defaultStaminaCalcConfig, defaultStaminaSkillTrigger} from '@/const/user/settings';
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
        session?.user.preloaded.settings?.stamina,
      ),
      skillTrigger: cloneMerge(
        defaultStaminaSkillTrigger,
        session?.user.preloaded.settings?.staminaSkillTrigger,
      ),
    },
  };

  return (
    <PublicPageLayout locale={locale}>
      <AdsUnit/>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.Common', 'UI.Stamina', 'UI.InPage.Team']}>
        <StaminaAnalysisClient {...props}/>
      </I18nProvider>
      <AdsUnit/>
    </PublicPageLayout>
  );
};
