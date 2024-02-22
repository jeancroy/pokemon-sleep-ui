import React from 'react';

import {PokemonIndirectSkillProductionInstantHelp} from '@/components/shared/pokemon/production/indirectSkill/help';
import {PokemonIndirectSkillProduction} from '@/types/game/producing/rate/skill';


type Props = {
  rate: PokemonIndirectSkillProduction,
};

export const PokemonIndirectSkillProductionUI = ({rate}: Props) => {
  const {help} = rate;

  return <PokemonIndirectSkillProductionInstantHelp effect={help}/>;
};
