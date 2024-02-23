import React from 'react';

import {clsx} from 'clsx';

import {FadingLayout} from '@/components/layout/fading/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonProductionSingleAtItem} from '@/components/shared/pokemon/production/single/item';
import {PokemonProductionSingleAtTotal} from '@/components/shared/pokemon/production/single/total';
import {PokemonProductionSingleProps} from '@/components/shared/pokemon/production/single/type';


export const PokemonProductionSingle = (props: PokemonProductionSingleProps) => {
  const {
    horizontal,
    display,
  } = props;

  return (
    <Flex direction={horizontal ? 'row' : 'col'} wrap className={clsx(
      'gap-1',
      horizontal ? 'items-center justify-end md:flex-row' : 'items-end justify-center',
    )}>
      <FadingLayout
        current={display}
        contents={{
          item: <PokemonProductionSingleAtItem {...props}/>,
          total: <PokemonProductionSingleAtTotal {...props}/>,
        }}
        className="place-items-end"
      />
    </Flex>
  );
};
