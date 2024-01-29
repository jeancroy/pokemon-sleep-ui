import React from 'react';

import {getServerSession} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getBerryDataMap, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getCookingUserSettingsRequiredData} from '@/controller/dataBundle/cookingSettings';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFieldMetaMap} from '@/controller/mapMeta';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {RatingClient} from '@/ui/rating/client';
import {RatingServerDataProps} from '@/ui/rating/type';
import {getOcrTranslationsForPokemonInfo} from '@/utils/ocr/translations/pokemon';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


export const Rating = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    mainSkillMap,
    subSkillMap,
    mapMeta,
    pokemonMaxLevel,
    session,
    ocrTranslations,
    cookingUserSettingsRequiredData,
  ] = await Promise.all([
    getPokedexMap(),
    getPokemonProducingParamsMap(),
    getIngredientChainMap(),
    getIngredientMap(),
    getBerryDataMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getFieldMetaMap(),
    getPokemonMaxLevelByBerry(),
    getServerSession(authOptions),
    getOcrTranslationsForPokemonInfo(),
    getCookingUserSettingsRequiredData(),
  ]);

  const props: RatingServerDataProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    mainSkillMap,
    subSkillMap,
    mapMeta,
    pokemonMaxLevel,
    ocrTranslations,
    preloaded: createUserSettingsBundle(session),
    ...cookingUserSettingsRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <AdsUnit/>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Rating',
        'UI.InPage.Team',
        'UI.Metadata',
        'UI.Ocr',
        'UI.Rating',
      ]}>
        <RatingClient {...props}/>
      </I18nProvider>
      <AdsUnit/>
    </PublicPageLayout>
  );
};
