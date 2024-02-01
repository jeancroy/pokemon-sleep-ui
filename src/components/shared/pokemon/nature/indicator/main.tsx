import React from 'react';

import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';

import {Flex} from '@/components/layout/flex/common';
import {defaultNatureIndicatorDimension} from '@/components/shared/pokemon/nature/indicator/const';
import {PokemonNatureIndicatorText} from '@/components/shared/pokemon/nature/indicator/text';
import {PokemonNatureIndicatorCommonProps} from '@/components/shared/pokemon/nature/indicator/type';


type Props = PokemonNatureIndicatorCommonProps & {
  className?: string,
};

export const PokemonNatureIndicator = ({className, ...props}: Props) => {
  const {hideName, dimension} = props;

  return (
    <Flex direction="row" center noFullWidth className={className}>
      {!hideName && <ChevronUpDownIcon className={dimension ?? defaultNatureIndicatorDimension}/>}
      <div>
        <PokemonNatureIndicatorText {...props}/>
      </div>
    </Flex>
  );
};
