import React from 'react';


import {PokedexPageParams} from '@/app/[locale]/pokedex/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex/common';
import {getBerryData} from '@/controller/berry';
import {getEventDrowsyPowerMultiplierData} from '@/controller/event/drowsyPowerMultiplier';
import {getAssociatedPokemonBranchData} from '@/controller/pokemon/branch';
import {getSinglePokemonInfo} from '@/controller/pokemon/info';
import {getSinglePokemonProducingParams} from '@/controller/pokemon/producing';
import {getSleepStyleNormalList} from '@/controller/sleepStyle';
import {getSleepStyleSpecialListOfPokemon} from '@/controller/sleepStyleSpecial';
import {getSnorlaxDataMap} from '@/controller/snorlax';
import {PageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokemonClient} from '@/ui/pokedex/page/client';
import {PokemonDataProps} from '@/ui/pokedex/page/type';


export const Pokemon = async ({params}: PageProps<PokedexPageParams>) => {
  const {id, locale} = params;
  const idNumber = Number(id);
  const pokemon = await getSinglePokemonInfo(idNumber);

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  const pokemonBranch = await getAssociatedPokemonBranchData(pokemon.id);

  const [
    pokemonProducingParams,
    sleepStyles,
    sleepStylesSpecial,
    berryData,
    snorlaxDataMap,
    eventDrowsyPowerMultiplierData,
  ] = await Promise.all([
    getSinglePokemonProducingParams(pokemon.id),
    getSleepStyleNormalList(idNumber),
    getSleepStyleSpecialListOfPokemon(idNumber),
    getBerryData(pokemon.berry.id),
    getSnorlaxDataMap(),
    getEventDrowsyPowerMultiplierData(),
  ]);

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: PokemonDataProps = {
    pokemon,
    pokemonBranch,
    pokemonProducingParams,
    sleepStyles,
    sleepStylesSpecial,
    berryData,
    snorlaxDataMap,
    eventDrowsyPowerMultiplierData,
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
          'UI.Image',
          'UI.Pokemon',
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
