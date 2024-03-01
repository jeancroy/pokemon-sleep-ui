import React from 'react';

import {getServerSession} from 'next-auth';

import {MealPageParams} from '@/app/[locale]/meal/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {getBerryDataMap, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonIngredientProductionByIngredientIds} from '@/controller/pokemon/ingredient';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSubSkillMap} from '@/controller/subSkill';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealClient} from '@/ui/meal/page/client';
import {MealServerDataProps} from '@/ui/meal/page/type';
import {createConfigBundle} from '@/utils/user/config/create';


type Props = {
  params: MealPageParams,
};

export const MealPage = async ({params}: Props) => {
  const {id, locale} = params;
  const configRequiredData = await getConfigRequiredData();
  const {mealMap} = configRequiredData;

  const meal = mealMap[parseInt(id)];

  if (!meal) {
    return <Failed text="Meal"/>;
  }

  const [
    session,
    pokedex,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    pokemonIngredientProductionMap,
    pokemonMaxLevel,
    recipeLevelData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexMap(),
    getPokemonProducingParamsMap(),
    getBerryDataMap(),
    getIngredientMap(),
    getIngredientChainMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getPokemonIngredientProductionByIngredientIds(meal.ingredients.map(({id}) => id)),
    getPokemonMaxLevelByBerry(),
    getRecipeLevelData(),
  ]);

  const props: MealServerDataProps = {
    meal,
    pokedex,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    pokemonIngredientProductionMap,
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
        'UI.Component.MealCoverageCombo',
        'UI.Metadata',
        'UI.InPage.Cooking',
        'UI.Pokemon',
      ]}>
        <MealClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
