import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getBerryDataMap, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getUserSettingsRequiredData} from '@/controller/dataBundle/settings';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFieldMetaMap} from '@/controller/mapMeta';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSnorlaxData} from '@/controller/snorlax';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {TeamAnalysisClient} from '@/ui/team/analysis/client/main';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


export const TeamAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    snorlaxData,
    mapMeta,
    mainSkillMap,
    subSkillMap,
    pokemonMaxLevel,
    recipeLevelData,
    userSettingsRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexMap(),
    getPokemonProducingParamsMap(),
    getIngredientChainMap(),
    getBerryDataMap(),
    getIngredientMap(),
    getSnorlaxData(),
    getFieldMetaMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getPokemonMaxLevelByBerry(),
    getRecipeLevelData(),
    getUserSettingsRequiredData(),
  ]);

  const props: TeamAnalysisServerDataProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    snorlaxData,
    mapMeta,
    mainSkillMap,
    subSkillMap,
    pokemonMaxLevel,
    recipeLevelData,
    preloaded: createUserSettingsBundle(session),
    ...userSettingsRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.Collapsible',
        'UI.Component.MealCoverageCombo',
        'UI.InPage.Cooking',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
        'UI.Metadata',
        'UI.Producing',
        'UI.Stamina',
        'UI.Rating',
        'UI.UserSettings',
      ]}>
        <TeamAnalysisClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
