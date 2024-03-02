import React from 'react';

import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


export type TeamMakerInputCommonProps = TeamMakerDataProps & {
  input: TeamMakerInput,
  setInput: React.Dispatch<React.SetStateAction<TeamMakerInput>>,
  maxRecipeLevel: number,
};
