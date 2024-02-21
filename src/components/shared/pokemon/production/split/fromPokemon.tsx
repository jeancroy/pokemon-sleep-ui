import React from 'react';

import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split/main';
import {PokemonProductionSplitCommonProps} from '@/components/shared/pokemon/production/split/type';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';


type Props = PokemonProductionSplitCommonProps & {
  rate: PokemonProducingRate,
  state: ProducingStateCalculated,
};

export const PokemonProductionSplitFromPokemonRate = ({rate, state, ...props}: Props) => {
  const {
    berry,
    ingredient,
    skill,
  } = rate;

  return (
    <PokemonProductionSplit
      berry={berry.strength[state]}
      ingredient={toSum(Object.values(ingredient).map(({strength}) => strength[state]))}
      skill={skill.strength[state]}
      {...props}
    />
  );
};
