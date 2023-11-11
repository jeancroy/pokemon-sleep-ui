import React from 'react';

import {SleepdexUpdater} from '@/hooks/sleepdex/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleId} from '@/types/game/sleepStyle';


export type SleepdexSectionProps = {
  title: React.ReactNode,
  sleepdex: SleepdexMap,
  updateSleepdex: SleepdexUpdater,
  pokemonListToShow: PokemonInfo[],
  getSleepStylesFromPokemon: (pokemonInfo: PokemonInfo) => SleepStyleId[],
  showPokemon: (pokemon: PokemonInfo) => void,
  sleepStyleDependencies: React.DependencyList,
};
