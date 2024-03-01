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
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {RatingClient} from '@/ui/rating/client';
import {RatingServerDataProps} from '@/ui/rating/type';
import {getOcrTranslationsForPokemonInfo} from '@/utils/ocr/translations/pokemon';
import {createConfigBundle} from '@/utils/user/config/create';


export const Rating = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    mainSkillMap,
    subSkillMap,
    mapMeta,
    recipeLevelData,
    pokemonMaxLevel,
    ocrTranslations,
    configRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexMap(),
    getPokemonProducingParamsMap(),
    getIngredientChainMap(),
    getIngredientMap(),
    getBerryDataMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getFieldMetaMap(),
    getRecipeLevelData(),
    getPokemonMaxLevelByBerry(),
    getOcrTranslationsForPokemonInfo(),
    getConfigRequiredData(),
  ]);

  const props: RatingServerDataProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    mainSkillMap,
    subSkillMap,
    fieldMetaMap: mapMeta,
    recipeLevelData,
    pokemonMaxLevel,
    ocrTranslations,
    preloaded: createConfigBundle(session),
    ...configRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.PokemonFilter',
        'UI.InPage.Rating',
        'UI.Metadata',
        'UI.Ocr',
        'UI.Pokemon',
        'UI.Rating',
      ]}>
        <RatingClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
