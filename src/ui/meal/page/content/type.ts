import React from 'react';

import {IngredientLevel} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';


export type MealPageContentCommonProps = {
  ingredientLevel: IngredientLevel,
  input: PokemonIndividualParams,
  setInput: React.Dispatch<React.SetStateAction<PokemonIndividualParams>>,
};
