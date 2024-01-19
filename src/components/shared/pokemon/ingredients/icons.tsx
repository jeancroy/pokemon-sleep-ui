import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {FlexDirection} from '@/components/layout/flex/type';
import {VerticalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {IngredientIconCommonProps} from '@/components/shared/pokemon/ingredients/type';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {NumberFormat} from '@/types/number';
import {formatNumber} from '@/utils/number/format';


type Props = IngredientIconCommonProps & {
  ingredients: IngredientProduction[][],
  direction?: FlexDirection,
  numberFormat?: NumberFormat,
  className?: string,
  classNameItem?: string,
};

export const PokemonIngredientIcons = ({
  ingredients,
  direction = 'row',
  numberFormat = 'int',
  className,
  classNameItem,
  ...props
}: Props) => {
  return (
    <Flex direction={direction} noFullWidth className={clsx(className ?? 'gap-0.5')}>
      {ingredients.map((data, idx) => (
        <React.Fragment key={data.map(({id, qty}) => `${id}x${qty}`).join('-')}>
          {idx !== 0 && <VerticalSplitter/>}
          {data.map(({id, qty}) => (
            <Flex key={`${id}x${qty}`} direction="row" center noFullWidth className={clsx(classNameItem ?? 'gap-1')}>
              <PokemonIngredientIcon id={id} {...props}/>
              <div>{formatNumber({format: numberFormat, num: qty})}</div>
            </Flex>
          ))}
        </React.Fragment>
      ))}
    </Flex>
  );
};
