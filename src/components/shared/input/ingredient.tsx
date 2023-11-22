import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterIconInput} from '@/components/input/filter/preset/icon';
import {IngredientId} from '@/types/game/ingredient';


type Props = FilterInputOnClickProps<IngredientId> & {
  ingredientIds: IngredientId[],
};

export const IngredientInput = ({ingredientIds, ...props}: Props) => {
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Cooking');

  return (
    <FilterIconInput
      title={t2('Ingredient.Name')}
      ids={ingredientIds}
      idToAlt={(id) => t(`Food.${id.toString()}`)}
      idToImageSrc={(id) => `/images/ingredient/${id}.png`}
      {...props}
    />
  );
};
