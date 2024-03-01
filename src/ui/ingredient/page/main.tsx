import React from 'react';

import {getServerSession} from 'next-auth';

import {IngredientPageParams} from '@/app/[locale]/ingredient/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex/common';
import {authOptions} from '@/const/auth';
import {getBerryDataMap, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientData, getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonIngredientProductionByIngredient} from '@/controller/pokemon/ingredient';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSubSkillMap} from '@/controller/subSkill';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {IngredientMeta} from '@/ui/ingredient/page/meta';
import {IngredientPokemonProduction} from '@/ui/ingredient/page/pokemon';
import {IngredientCookableMeals} from '@/ui/ingredient/page/recipe';
import {IngredientProductionDataProps} from '@/ui/ingredient/page/type';
import {createConfigBundle} from '@/utils/user/config/create';


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
    session,
    pokemonIngredientProduction,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    pokedexMap,
    pokemonMaxLevel,
    recipeLevelData,
    configRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonIngredientProductionByIngredient(ingredient.id),
    getPokemonProducingParamsMap(),
    getBerryDataMap(),
    getIngredientMap(),
    getIngredientChainMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getPokedexMap(),
    getPokemonMaxLevelByBerry(),
    getRecipeLevelData(),
    getConfigRequiredData(),
  ]);

  const {mealMap} = configRequiredData;

  const props: IngredientProductionDataProps = {
    pokedexMap,
    pokemonIngredientProduction,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    recipeLevelData,
    preloaded: createConfigBundle(session),
    ...configRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <Flex className="gap-1.5 md:flex-row">
        <IngredientMeta {...ingredient}/>
        <IngredientCookableMeals
          mealMap={mealMap}
          recipeLevelData={recipeLevelData}
          ingredientMap={ingredientMap}
          ingredientId={ingredient.id}
        />
      </Flex>
      <AdsUnit/>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Metadata',
        'UI.Pokemon',
      ]}>
        <IngredientPokemonProduction
          pokemonMaxLevel={pokemonMaxLevel}
          ingredient={ingredient}
          {...props}
        />
      </I18nProvider>
    </PublicPageLayout>
  );
};
