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
import {getPokemonList} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokedexTierListClient} from '@/ui/pokedex/tier/client';
import {PokedexTierListDataProps} from '@/ui/pokedex/tier/type';
import {createConfigBundle} from '@/utils/user/config/create';


export const PokedexTierList = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const [
    session,
    pokemonList,
    pokemonProducingParamsMap,
    pokemonMaxLevel,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mapMeta,
    recipeLevelData,
    configRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonList(),
    getPokemonProducingParamsMap(),
    getPokemonMaxLevelByBerry(),
    getBerryDataMap(),
    getIngredientMap(),
    getIngredientChainMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getFieldMetaMap(),
    getRecipeLevelData(),
    getConfigRequiredData(),
  ]);

  const props: PokedexTierListDataProps = {
    pokemonList,
    pokemonProducingParamsMap,
    pokemonMaxLevel,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    fieldMetaMap: mapMeta,
    recipeLevelData,
    preloaded: {
      bundle: createConfigBundle(session),
    },
    ...configRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Metadata',
        'UI.InPage.Pokedex',
        'UI.Pokemon',
      ]}>
        <PokedexTierListClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
