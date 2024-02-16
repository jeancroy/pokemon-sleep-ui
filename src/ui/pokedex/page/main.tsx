import React from 'react';

import {getServerSession} from 'next-auth';

import {PokedexPageParams} from '@/app/[locale]/pokedex/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex/common';
import {authOptions} from '@/const/auth';
import {getBerryData} from '@/controller/berry';
import {getUserSettingsRequiredData} from '@/controller/dataBundle/settings';
import {getEventDrowsyPowerMultiplierData} from '@/controller/event/drowsyPowerMultiplier';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getAssociatedPokemonBranchData} from '@/controller/pokemon/branch';
import {getPokedexMap, getSinglePokemonInfo} from '@/controller/pokemon/info';
import {getSinglePokemonProducingParams} from '@/controller/pokemon/producing';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSleepStyleNormalList} from '@/controller/sleepStyle';
import {getSleepStyleSpecialListOfPokemon} from '@/controller/sleepStyleSpecial';
import {getSnorlaxDataMap} from '@/controller/snorlax';
import {getSubSkillMap} from '@/controller/subSkill';
import {PageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokemonClient} from '@/ui/pokedex/page/client';
import {PokemonDataProps} from '@/ui/pokedex/page/type';
import {getRelatedPokemonIds} from '@/utils/game/pokemon/branch';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


export const Pokemon = async ({params}: PageProps<PokedexPageParams>) => {
  const {id, locale} = params;
  const idNumber = Number(id);
  const pokemon = await getSinglePokemonInfo(idNumber);

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  const pokemonBranch = await getAssociatedPokemonBranchData(pokemon.id);

  const [
    session,
    pokedex,
    pokemonProducingParams,
    ingredientChainMap,
    sleepStyles,
    sleepStylesSpecial,
    berryData,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    snorlaxDataMap,
    recipeLevelData,
    eventDrowsyPowerMultiplierData,
    settingsRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexMap(getRelatedPokemonIds({pokemon, branchData: pokemonBranch})),
    getSinglePokemonProducingParams(pokemon.id),
    getIngredientChainMap(),
    getSleepStyleNormalList(idNumber),
    getSleepStyleSpecialListOfPokemon(idNumber),
    getBerryData(pokemon.berry.id),
    getIngredientMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getSnorlaxDataMap(),
    getRecipeLevelData(),
    getEventDrowsyPowerMultiplierData(),
    getUserSettingsRequiredData(),
  ]);

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: PokemonDataProps = {
    pokedex,
    pokemon,
    pokemonBranch,
    pokemonProducingParams,
    ingredientChainMap,
    sleepStyles,
    sleepStylesSpecial,
    berryData,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    snorlaxDataMap,
    recipeLevelData,
    eventDrowsyPowerMultiplierData,
    preloaded: createUserSettingsBundle(session),
    ...settingsRequiredData,
  };

  return (
    <PublicPageLayout locale={locale}>
      <Flex center className="gap-2">
        <I18nProvider locale={locale} namespaces={[
          'Game',
          'UI.Common',
          'UI.Component.MealCoverageCombo',
          'UI.Evolution',
          'UI.InPage.Cooking',
          'UI.InPage.Pokedex',
          'UI.InPage.Team',
          'UI.Image',
          'UI.Metadata',
          'UI.Multiplier',
          'UI.SleepStyle',
        ]}>
          <PokemonClient {...props}/>
        </I18nProvider>
      </Flex>
    </PublicPageLayout>
  );
};
