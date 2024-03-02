import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';


export const PokemonLevelSliderRow = (props: Omit<NumberSliderRequiredProps, 'text' | 'max'>) => {
  return (
    <InputRow className="p-1.5">
      <PokemonLevelSlider {...props}/>
    </InputRow>
  );
};
