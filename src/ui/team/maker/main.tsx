import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getBerryDataMap, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFieldMetaMap} from '@/controller/mapMeta';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSnorlaxData} from '@/controller/snorlax';
import {getSubSkillMap} from '@/controller/subSkill';
import {Locale} from '@/types/next/locale';
import {DefaultPageProps} from '@/types/next/page/common';
import {PremiumOnlyPageLayout} from '@/ui/base/layout/premiumOnly/main';
import {TeamMakerClient} from '@/ui/team/maker/client/main';
import {TeamMakerServerDataProps} from '@/ui/team/maker/type';
import {createConfigBundle} from '@/utils/user/config/create';


type TeamMakerProps = {
  locale: Locale,
};

const TeamMaker = async ({locale}: TeamMakerProps) => {
  const session = await getServerSession(authOptions);

  const [
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mapMeta,
    snorlaxData,
    pokemonMaxLevel,
    recipeLevelData,
    configRequiredData,
  ] = await Promise.all([
    getPokedexMap(),
    getPokemonProducingParamsMap(),
    getIngredientChainMap(),
    getBerryDataMap(),
    getIngredientMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getFieldMetaMap(),
    getSnorlaxData(),
    getPokemonMaxLevelByBerry(),
    getRecipeLevelData(),
    getConfigRequiredData(),
  ]);

  const props: TeamMakerServerDataProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mapMeta,
    snorlaxData,
    pokemonMaxLevel,
    recipeLevelData,
    preloaded: createConfigBundle(session),
    ...configRequiredData,
  };

  return (
    <I18nProvider locale={locale} namespaces={[
      'Game',
      'UI.Common',
      'UI.Component.MealCoverageCombo',
      'UI.InPage.Cooking',
      'UI.InPage.Pokedex',
      'UI.InPage.Team',
      'UI.Metadata',
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
