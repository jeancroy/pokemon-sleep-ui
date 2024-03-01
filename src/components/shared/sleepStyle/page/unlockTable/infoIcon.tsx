import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';

import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {SleepdexStyleIcon} from '@/components/shared/sleepdex/styleIcon';
import {MapUnlockTableDisplayType} from '@/components/shared/sleepStyle/page/type';
import {PokedexMap} from '@/types/game/pokemon';
import {SleepStyleNormalFlattened} from '@/types/game/sleepStyle';


type Props = {
  data: SleepStyleNormalFlattened,
  pokedexMap: PokedexMap,
  displayType: MapUnlockTableDisplayType,
};

export const MapTableInfoIcon = ({data, pokedexMap, displayType}: Props) => {
  if (displayType === 'sleepStyle') {
    const {style} = data;

    return <SleepdexStyleIcon styleId={style.style} dimension="size-4"/>;
  }

  const pokemon = pokedexMap[data.pokemonId];

  if (!pokemon) {
    return <QuestionMarkCircleIcon className="size-4"/>;
  }

  if (displayType === 'specialty') {
    return <PokemonSpecialty specialty={pokemon.specialty} dimension="size-4" hideText/>;
  }

  if (displayType === 'sleepType') {
    return <PokemonSleepType sleepType={pokemon.sleepType} dimension="size-4" hideText/>;
  }

  console.error(`Unhandled map unlock table display type: ${displayType satisfies never}`);
};
