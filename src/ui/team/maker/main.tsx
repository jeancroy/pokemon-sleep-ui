import React from 'react';

import {getServerSession} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getAllMealsAsMap} from '@/controller/meal';
import {getUserPokeboxSorted} from '@/controller/pokebox';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSnorlaxData} from '@/controller/snorlax';
import {getSubSkillMap} from '@/controller/subSkill';
import {Locale} from '@/types/next/locale';
import {DefaultPageProps} from '@/types/next/page/common';
import {PremiumOnlyPageLayout} from '@/ui/base/layout/premiumOnly/main';
import {TeamMakerClient} from '@/ui/team/maker/client';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


type TeamMakerProps = {
  locale: Locale,
};

const TeamMaker = async ({locale}: TeamMakerProps) => {
  const session = await getServerSession(authOptions);

  const [
    pokeboxList,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    mapMeta,
    snorlaxData,
  ] = await Promise.all([
    getUserPokeboxSorted(session?.user.id),
    getPokemonAsMap(),
    getAllPokemonProducingParams(),
    getIngredientChainMap(),
    getAllBerryData(),
    getAllIngredients(),
    getMainSkillMap(),
    getSubSkillMap(),
    getAllMealsAsMap(),
    getAllMapMeta(),
    getSnorlaxData(),
  ]);

  const props: TeamMakerDataProps = {
    pokeboxList,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    mapMeta,
    snorlaxData,
    preloaded: createUserSettingsBundle(session),
  };

  return (
    <I18nProvider locale={locale} namespaces={[
      'Game',
      'UI.Common',
      'UI.InPage.Cooking',
      'UI.InPage.Pokedex',
      'UI.InPage.Team',
      'UI.Producing',
      'UI.Stamina',
    ]}>
      <TeamMakerClient {...props}/>
    </I18nProvider>
  );
};

export const TeamMakerEntry = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PremiumOnlyPageLayout locale={locale}>
      <AdsUnit/>
      <TeamMaker locale={locale}/>
      <AdsUnit/>
    </PremiumOnlyPageLayout>
  );
};
