import React from 'react';


import {I18nProvider} from '@/components/i18n/provider';
import {getSnorlaxData} from '@/controller/snorlax';
import {detailedProductionI18nNamespaces} from '@/i18n/namespaces';
import {Locale} from '@/types/next/locale';
import {DefaultPageProps} from '@/types/next/page/common';
import {PremiumOnlyPageLayout} from '@/ui/base/layout/premiumOnly/main';
import {TeamMakerClient} from '@/ui/team/maker/client/main';
import {TeamMakerServerDataProps} from '@/ui/team/maker/type';


type TeamMakerProps = {
  locale: Locale,
};

const TeamMaker = async ({locale}: TeamMakerProps) => {
  const [
    snorlaxData,
  ] = await Promise.all([
    getSnorlaxData(),
  ]);

  const props: TeamMakerServerDataProps = {
    snorlaxData,
  };

  return (
    <I18nProvider locale={locale} namespaces={[
      'Game',
      'UI.Common',
      'UI.Component.MealCoverageCombo',
      'UI.Component.PokemonFilter',
      'UI.InPage.Cooking',
      'UI.InPage.Team',
      'UI.Metadata',
      ...detailedProductionI18nNamespaces,
    ]}>
      <TeamMakerClient {...props}/>
    </I18nProvider>
  );
};

export const TeamMakerEntry = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PremiumOnlyPageLayout locale={locale}>
      <TeamMaker locale={locale}/>
    </PremiumOnlyPageLayout>
  );
};
