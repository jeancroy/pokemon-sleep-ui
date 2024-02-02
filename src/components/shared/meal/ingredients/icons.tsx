import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {ingredientIconMarkToStyle} from '@/components/shared/meal/ingredients/const';
import {IngredientIconsCommonProps} from '@/components/shared/meal/ingredients/type';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {imageIconSizes} from '@/styles/image';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';
import {Dimension} from '@/types/style';
import {toSum} from '@/utils/array';


type Props = IngredientIconsCommonProps & {
  ingredients: PokemonProducingItem<IngredientId>[],
  dimension?: Dimension,
  iconClickable?: boolean,
  showTotalCount?: boolean,
  showXMarkOnEmpty?: boolean,
  formatQty?: (qty: number) => string,
  classOfText?: `text-${string}`,
  className?: string,
};

export const IngredientIcons = ({
  useTextShadow = true,
  getMark,
  ingredients,
  dimension,
  iconClickable,
  showTotalCount,
  showXMarkOnEmpty,
  formatQty,
  classOfText,
  className,
}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <Flex direction="row" noFullWidth className={clsx(
      'items-end gap-0.5',
      classOfText ?? 'text-xs',
      className,
    )}>
      {
        showTotalCount &&
        <InfoIcon dimension={dimension} style="glow" className="self-center">
          {toSum(ingredients.map(({qty}) => qty))}
        </InfoIcon>
      }
      {ingredients.map((ingredient) => {
        const {id, qty} = ingredient;
        const mark = getMark && getMark(ingredient);

        return (
          <Flex key={id} direction="row" noFullWidth wrap center className="gap-0.5">
            {iconClickable ?
              <PokemonIngredientIcon id={id} dimension={dimension ?? 'size-4'}/> :
              <div className={clsx('relative', dimension ?? 'size-4')}>
                <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageIconSizes}/>
              </div>}
            <div className={clsx(
              useTextShadow && 'text-shadow-preset',
              mark && ingredientIconMarkToStyle[mark],
            )}>
              {formatQty ? formatQty(qty) : qty}
            </div>
          </Flex>
        );
      })}
      {showXMarkOnEmpty && !ingredients.length && <XCircleIcon className={dimension}/>}
    </Flex>
  );
};
