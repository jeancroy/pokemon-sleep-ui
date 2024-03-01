import React from 'react';

import {getServerSession} from 'next-auth';

import {AnalysisPageParams} from '@/app/[locale]/analysis/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {getBerryDataMap, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFieldMetaMap} from '@/controller/mapMeta';
import {getPokemonList} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSleepStyleNormalMap} from '@/controller/sleepStyle';
import {getSubSkillMap} from '@/controller/subSkill';
import {AnalysisPageClient} from '@/ui/analysis/page/client';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {createConfigBundle} from '@/utils/user/config/create';


type Props = {
  params: AnalysisPageParams,
};

export const AnalysisPage = async ({params}: Props) => {
  const {id, locale} = params;
  const [
    session,
    pokemonList,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientChainMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    sleepStyleMap,
    mapMeta,
    recipeLevelData,
    pokemonMaxLevel,
    configRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonList(),
    getPokemonProducingParamsMap(),
    getBerryDataMap(),
    getIngredientChainMap(),
    getIngredientMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getSleepStyleNormalMap(),
    getFieldMetaMap(),
    getRecipeLevelData(),
    getPokemonMaxLevelByBerry(),
    getConfigRequiredData(),
  ]);

  const pokemon = pokemonList.find((pokemon) => pokemon.id === Number(id));

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  const props: AnalysisPageCommonProps = {
    pokemonList,
    pokemon,
    pokemonProducingParamsMap,
    mainSkillMap,
    subSkillMap,
    ingredientMap,
    ingredientChainMap,
    berryDataMap,
    sleepStyleMap,
    fieldMetaMap: mapMeta,
    recipeLevelData,
    pokemonMaxLevel,
    preloaded: createConfigBundle(session),
    ...configRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.PokemonFilter',
        'UI.InPage.Analysis',
        'UI.Pokemon',
        'UI.Metadata',
      ]}>
        <AnalysisPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
