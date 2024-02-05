import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {LevelIcon} from '@/components/shared/icon/lv';
import {NumberInputRequired} from '@/components/shared/input/number/required/main';


type Props = {
  level: number,
  maxRecipeLevel: number,
  onUpdate: (updated: number) => void,
  disabled?: boolean,
  className?: string,
};

export const MealRecipeLevelInput = ({level, maxRecipeLevel, onUpdate, disabled, className}: Props) => {
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
    />
  );
};
