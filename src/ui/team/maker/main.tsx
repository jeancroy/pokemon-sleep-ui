import React from 'react';


import {I18nProvider} from '@/components/i18n/provider';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getSnorlaxData} from '@/controller/snorlax';
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
    pokemonMaxLevel,
  ] = await Promise.all([
    getSnorlaxData(),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: TeamMakerServerDataProps = {
    snorlaxData,
    pokemonMaxLevel,
  };

  return (
    <I18nProvider locale={locale} namespaces={[
      'Game',
      'UI.Common',
      'UI.Component.MealCoverageCombo',
      'UI.Component.PokemonFilter',
      'UI.Component.PokemonDetailedProduction',
      'UI.InPage.Cooking',
      'UI.InPage.Team',
      'UI.Metadata',
      'UI.Pokemon',
      'UI.Producing',
      'UI.Stamina',
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
