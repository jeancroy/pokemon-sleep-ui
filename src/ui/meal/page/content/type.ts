import React from 'react';

import {PokemonIndividualParams} from '@/types/game/pokemon/params';


export type MealPageContentCommonProps = {
  input: PokemonIndividualParams,
  setInput: React.Dispatch<React.SetStateAction<PokemonIndividualParams>>,
};
