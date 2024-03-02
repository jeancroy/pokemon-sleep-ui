import React from 'react';


import {IngredientPageParams} from '@/app/[locale]/ingredient/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex/common';
import {getIngredientData} from '@/controller/ingredient';
import {getPokemonIngredientProductionByIngredient} from '@/controller/pokemon/ingredient';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {IngredientMeta} from '@/ui/ingredient/page/meta';
import {IngredientPokemonProduction} from '@/ui/ingredient/page/pokemon';
import {IngredientCookableMeals} from '@/ui/ingredient/page/recipe';


type Props = {
  params: IngredientPageParams,
};

export const IngredientPage = async ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = Number(id);
  const ingredient = await getIngredientData(idNumber);

  if (!ingredient) {
    return <Failed text="Ingredient"/>;
  }

  const [
    pokemonIngredientProduction,
  ] = await Promise.all([
    getPokemonIngredientProductionByIngredient(ingredient.id),
  ]);

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Cooking',
        'UI.Metadata',
        'UI.Pokemon',
      ]}>
        <Flex className="gap-1.5 md:flex-row">
          <IngredientMeta {...ingredient}/>
          <IngredientCookableMeals ingredientId={ingredient.id}/>
        </Flex>
        <AdsUnit/>
        <IngredientPokemonProduction
          ingredient={ingredient}
          pokemonIngredientProduction={pokemonIngredientProduction}
        />
      </I18nProvider>
    </PublicPageLayout>
  );
};
