import isEqual from 'lodash/isEqual';

import {ProductionOfPokemon} from '@/ui/analysis/page/calc/production/type';


export const isRateOfPokemonSame = (a: ProductionOfPokemon, b: ProductionOfPokemon): boolean => {
  if (a.pokemon.id !== b.pokemon.id) {
    return false;
  }

  if (a.rate.berry.id !== b.rate.berry.id) {
    return false;
  }

  return isEqual(Object.keys(a.rate.ingredient), Object.keys(b.rate.ingredient));
};
