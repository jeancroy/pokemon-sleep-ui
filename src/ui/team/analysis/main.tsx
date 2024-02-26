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
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {TeamAnalysisClient} from '@/ui/team/analysis/client/main';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {createConfigBundle} from '@/utils/user/config/create';


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
    configRequiredData,
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
    getConfigRequiredData(),
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
    preloaded: createConfigBundle(session),
    ...configRequiredData,
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
