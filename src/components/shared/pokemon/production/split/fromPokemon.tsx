import React from 'react';

import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split/main';
import {PokemonProductionSplitCommonProps} from '@/components/shared/pokemon/production/split/type';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {getTotalIngredientRateOfPokemon} from '@/utils/game/producing/reducer/total/common';
import {getTotalStrengthProductionFromIndirectSkill} from '@/utils/game/producing/reducer/total/indirectSkill';


type Props = PokemonProductionSplitCommonProps & {
  rate: PokemonProducingRate,
  state: ProducingStateCalculated,
};

export const PokemonProductionSplitFromPokemonRate = ({rate, state, ...props}: Props) => {
  const {
    berry,
    skill,
    skillIndirect,
  } = rate;

  return (
    <PokemonProductionSplit
      berry={berry.strength[state]}
      ingredient={getTotalIngredientRateOfPokemon({rate, target: 'strength', state})}
      skill={skill.strength[state] + getTotalStrengthProductionFromIndirectSkill({skillIndirect})}
      {...props}
    />
  );
};
