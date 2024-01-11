import React from 'react';

import {SleepdexSectionProps} from '@/components/shared/sleepdex/section/type';
import {toSum} from '@/utils/array';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';
import {isNotNullish} from '@/utils/type';


export const useSleepdexSection = ({
  sleepdex,
  pokemonListToShow,
  getSleepStylesFromPokemon,
  sleepStyleDependencies,
}: SleepdexSectionProps) => {
  const {
    availableSleepStyles,
    totalSleepStyles,
  } = React.useMemo(
    () => {
      const availableSleepStyles = pokemonListToShow
        .map((pokemon) => ({
          pokemon,
          sleepStyles: getSleepStylesFromPokemon(pokemon),
        }))
        .filter(isNotNullish);
      const totalSleepStyles = toSum(availableSleepStyles.map(({sleepStyles}) => sleepStyles.length));

      return {
        availableSleepStyles,
        totalSleepStyles,
      };
    },
    sleepStyleDependencies,
  );
  const unlockedSleepStyles = React.useMemo(
    () => toSum(availableSleepStyles.map(({pokemon, sleepStyles}) => (
      sleepStyles
        .filter(({style}) => !!sleepdex[toSleepdexStyleId({
          pokemonId: pokemon.id,
          styleId: style,
        })])
        .length
    ))),
    [availableSleepStyles, sleepdex],
  );

  return {
    availableSleepStyles,
    totalSleepStyles,
    unlockedSleepStyles,
  };
};
