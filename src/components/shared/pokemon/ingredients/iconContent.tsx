import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {IngredientIconCommonProps} from '@/components/shared/pokemon/ingredients/type';
import {imageSmallIconSizes} from '@/styles/image';


type Props = IngredientIconCommonProps & {
  id: number,
  clickableStyle?: boolean,
};

export const PokemonIngredientIconContent = ({dimension, id, clickableStyle}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <div className={clsx('relative', clickableStyle && 'button-clickable', dimension ?? 'size-5')}>
      <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageSmallIconSizes}/>
    </div>
  );
};
