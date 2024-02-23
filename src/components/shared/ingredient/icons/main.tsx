import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {VerticalSplitter} from '@/components/shared/common/splitter';
import {ingredientIconMarkToStyle} from '@/components/shared/ingredient/icons/const';
import {IngredientIconsCommonProps} from '@/components/shared/ingredient/icons/type';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {toSum} from '@/utils/array';


type Props = IngredientIconsCommonProps & {
  ingredients: IngredientProduction[][],
};

export const IngredientIcons = ({
  useTextShadow,
  getMark,
  className,
  direction = 'row',
  showTotalCount,
  showXMarkOnEmpty,
  formatQty,
  classOfItem,
  classOfGap,
  classOfText,
  noQuantity,
  ingredients,
  ...props
}: Props) => {
  const {dimension} = props;

  return (
    <Flex direction={direction} noFullWidth className={clsx(
      'items-end',
      classOfGap ?? 'gap-0.5',
      classOfText ?? 'text-xs',
      className,
    )}>
      {
        showTotalCount &&
        <InfoIcon dimension={dimension} style="glow" className="self-center">
          {toSum(ingredients.flatMap((section) => section.map(({qty}) => qty)))}
        </InfoIcon>
      }
      {ingredients.map((section, idx) => (
        <React.Fragment key={section.map(({id, qty}) => `${id}x${qty}`).join('-')}>
          {idx !== 0 && <VerticalSplitter/>}
          {section.map((ingredient) => {
            const {id, qty} = ingredient;
            const mark = getMark && getMark(ingredient);

            return (
              <Flex key={`${id}x${qty}`} direction="row" noFullWidth wrap center className={classOfItem ?? 'gap-0.5'}>
                <PokemonIngredientIcon id={id} dimension={dimension ?? 'size-4'} {...props}/>
                {
                  !noQuantity &&
                  <span className={clsx(
                    useTextShadow && 'text-shadow-preset',
                    mark && ingredientIconMarkToStyle[mark],
                  )}>
                    {formatQty ? formatQty(qty) : qty}
                  </span>
                }
              </Flex>
            );
          })}
        </React.Fragment>
      ))}
      {showXMarkOnEmpty && !ingredients.length && <XCircleIcon className={dimension}/>}
    </Flex>
  );
};
