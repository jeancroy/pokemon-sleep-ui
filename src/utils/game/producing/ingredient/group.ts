import groupBy from 'lodash/groupBy';

import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {toSum} from '@/utils/array';


export const groupIngredientProductions = (productions: IngredientProduction[]): IngredientProduction[] => {
  return Object
    .entries(groupBy(productions, (item) => item.id))
    .map(([id, productions]) => ({
      id: parseInt(id),
      qty: toSum(productions.map(({qty}) => qty)),
    }));
};
