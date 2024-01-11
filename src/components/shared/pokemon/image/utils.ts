import {isMatch} from 'lodash';

import {PokemonImageType} from '@/components/shared/pokemon/image/type';


export const getPokemonImageTypeAsKey = (image: PokemonImageType): string => {
  const {type} = image;

  if (type === 'default') {
    return `default-${image.image}`;
  }

  if (type === 'sleepStyle') {
    return `sleepStyle-${image.sleepStyleId}`;
  }

  throw new Error(`Unhandled pokemon image type [${type satisfies never}]`);
};

export const isPokemonImageTypeEqual = (a: PokemonImageType, b: PokemonImageType): boolean => {
  return isMatch(a, b);
};
