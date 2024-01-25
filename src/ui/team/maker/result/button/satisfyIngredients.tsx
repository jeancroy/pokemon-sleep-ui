import React from 'react';

import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {IngredientCounter} from '@/types/game/ingredient';
import {Dimension} from '@/types/style';
import {isIngredientCounterEmpty} from '@/utils/game/ingredientCounter';


type Props = {
  shortage: IngredientCounter,
};

export const TeamMakerIngredientSatisfactionIndicator = ({shortage}: Props) => {
  const t = useTranslations('UI.InPage.Team.Maker.State.IngredientRequirements');

  const isEmpty = isIngredientCounterEmpty(shortage);
  const dimension: Dimension = 'size-6';

  return (
    <Flex noFullWidth direction="row" className="items-center">
      <GenericIngredientIcon alt={isEmpty ? t('Pass') : t('Fail')} dimension={dimension}/>
      <div className={clsx(dimension, isEmpty ? 'text-safe' : 'text-danger')}>
        {isEmpty ? <CheckIcon/> : <XMarkIcon/>}
      </div>
    </Flex>
  );
};
