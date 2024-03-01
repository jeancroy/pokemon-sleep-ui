import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getBerryDataMap} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {StaminaAnalysisClient} from '@/ui/stamina/client';
import {StaminaAnalysisDataProps} from '@/ui/stamina/type';
import {createConfigBundle} from '@/utils/user/config/create';


export const StaminaAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    pokedexMap,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    recipeLevelData,
    configRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexMap(),
    getPokemonProducingParamsMap(),
    getBerryDataMap(),
    getIngredientMap(),
    getIngredientChainMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getRecipeLevelData(),
    getConfigRequiredData(),
  ]);

  const props: StaminaAnalysisDataProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    recipeLevelData,
    ...configRequiredData,
    preloaded: {
      bundle: createConfigBundle(session),
    },
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.PokemonFilter',
        'UI.Pokemon',
        'UI.Stamina',
      ]}>
        <StaminaAnalysisClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
