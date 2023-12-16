import React from 'react';

import {getServerSession} from 'next-auth';

import {BerryPageParams} from '@/app/[locale]/berry/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {getBerryData, getBerryDataMap} from '@/controller/berry';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFavoriteInfoOfBerry} from '@/controller/mapMeta';
import {getMealMap} from '@/controller/meal';
import {getPokedexMap, getPokemonByBerry} from '@/controller/pokemon/info';
import {getPokemonIngredientProductionByBerry} from '@/controller/pokemon/ingredient';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getSubSkillMap} from '@/controller/subSkill';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {BerryPageClient} from '@/ui/berry/page/client';
import {BerryPageDataProps} from '@/ui/berry/page/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


type Props = {
  params: BerryPageParams,
};

export const BerryPage = async ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = parseInt(id);

  const [
    session,
    pokedex,
    pokemonProducingParamsMap,
    pokemonIngredientProduction,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    pokemonOfBerry,
    berryData,
    favoriteInfo,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexMap(),
    getPokemonProducingParamsMap(),
    getPokemonIngredientProductionByBerry(idNumber),
    getBerryDataMap(),
    getIngredientMap(),
    getIngredientChainMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getMealMap(),
    getPokemonByBerry(idNumber),
    getBerryData(idNumber),
    getFavoriteInfoOfBerry(idNumber),
  ]);

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: BerryPageDataProps = {
    pokedex,
    pokemonProducingParamsMap,
    pokemonIngredientProduction,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    pokemonOfBerry,
    berryData,
    favoriteInfo,
    preloaded: createUserSettingsBundle(session),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
        'UI.Metadata',
      ]}>
        <BerryPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
