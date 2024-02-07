import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {LevelIcon} from '@/components/shared/icon/lv';
import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {RecipeLevelInputCommonProps} from '@/components/shared/meal/recipeLevel/type';


type Props = RecipeLevelInputCommonProps & {
  level: number,
  onUpdate: (updated: number) => void,
};

export const RecipeLevelInput = ({
  maxRecipeLevel,
  disabled,
  classOfInputWidth,
  className,
  level,
  onUpdate,
}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <NumberInputRequired
      text={<LevelIcon alt={t('RecipeLevel')}/>}
      classOfText={clsx(
        'text-xs text-slate-500 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-500',
      )}
      value={level}
      min={1}
      max={maxRecipeLevel}
      setValue={(level) => onUpdate(level)}
      disabled={disabled}
      className={className}
      classOfInputWidth={classOfInputWidth}
    />
  );
};
