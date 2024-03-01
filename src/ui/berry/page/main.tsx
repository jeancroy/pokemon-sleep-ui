import React from 'react';

import {getServerSession} from 'next-auth';

import {BerryPageParams} from '@/app/[locale]/berry/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {getBerryData, getBerryDataMap} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFavoriteInfoOfBerry} from '@/controller/mapMeta';
import {getPokedexMap, getPokemonByBerry} from '@/controller/pokemon/info';
import {getPokemonIngredientProductionByBerry} from '@/controller/pokemon/ingredient';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSubSkillMap} from '@/controller/subSkill';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {BerryPageClient} from '@/ui/berry/page/client';
import {BerryPageDataProps} from '@/ui/berry/page/type';
import {createConfigBundle} from '@/utils/user/config/create';


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
    pokemonOfBerry,
    berryData,
    favoriteInfo,
    recipeLevelData,
    configRequiredData,
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
    getPokemonByBerry(idNumber),
    getBerryData(idNumber),
    getFavoriteInfoOfBerry(idNumber),
    getRecipeLevelData(),
    getConfigRequiredData(),
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
    pokemonOfBerry,
    berryData,
    favoriteInfo,
    recipeLevelData,
    preloaded: createConfigBundle(session),
    ...configRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Pokemon',
        'UI.Metadata',
      ]}>
        <BerryPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
