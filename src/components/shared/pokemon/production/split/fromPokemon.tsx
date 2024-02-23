import React from 'react';

import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split/main';
import {PokemonProductionSplitCommonProps} from '@/components/shared/pokemon/production/split/type';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {getTotalPokemonIngredientProduction} from '@/utils/game/producing/reducer/total/common';
import {getTotalStrengthProductionFromIndirectSkill} from '@/utils/game/producing/reducer/total/indirectSkill';


type Props = PokemonProductionSplitCommonProps & {
  rate: PokemonProduction,
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
      ingredient={getTotalPokemonIngredientProduction({rate, target: 'strength', state})}
      skill={skill.strength[state] + getTotalStrengthProductionFromIndirectSkill({skillIndirect})}
      {...props}
    />
  );
};
