import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';

import {Grid} from '@/components/layout/grid';
import {PokemonSubSkillSelectionButton} from '@/components/shared/pokemon/subSkill/selector/button';
import {SubSkillData, SubSkillId} from '@/types/game/pokemon/subSkill';


type Props = {
  data: SubSkillData[],
  selectedSubSkills: SubSkillId[],
  onSelect: (id: SubSkillId) => void,
};

export const PokemonSubSkillSelectionButtons = ({data, selectedSubSkills, onSelect}: Props) => {
  return (
    <Grid center className="grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3">
      {data.length ?
        data.map((single) => (
          <PokemonSubSkillSelectionButton
            key={single.id}
            data={single}
            selectable={!selectedSubSkills.includes(single.id)}
            onClick={() => onSelect(single.id)}
          />
        )) :
        <QuestionMarkCircleIcon className="size-9"/>}
    </Grid>
  );
};
