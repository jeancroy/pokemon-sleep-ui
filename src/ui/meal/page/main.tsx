import React from 'react';


import {MealPageParams} from '@/app/[locale]/meal/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getPokemonIngredientProductionByIngredientIds} from '@/controller/pokemon/ingredient';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealClient} from '@/ui/meal/page/client';
import {MealServerDataProps} from '@/ui/meal/page/type';


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
    pokemonIngredientProductionMap,
    pokemonMaxLevel,
  ] = await Promise.all([
    getPokemonIngredientProductionByIngredientIds(meal.ingredients.map(({id}) => id)),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: MealServerDataProps = {
    meal,
    pokemonIngredientProductionMap,
    pokemonMaxLevel,
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
