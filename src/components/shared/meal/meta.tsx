import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MealImage} from '@/components/shared/meal/image';
import {mealTypeTextStyle} from '@/styles/game/mealType';
import {Meal} from '@/types/game/meal/main';


type Props = {
  meal: Meal,
  className?: string,
};

export const MealMeta = ({meal, className}: Props) => {
  const {id, type} = meal;

  const t = useTranslations('Game.Food');

  const mealName = t(id.toString());

  return (
    <Flex center noFullWidth className={clsx('gap-2', className)}>
      <div className={clsx('text-lg', mealTypeTextStyle[type])}>
        {mealName}
      </div>
      <MealImage
        mealId={id}
        dimension="size-44"
        className="rounded-lg border border-slate-300 dark:border-slate-700"
      />
    </Flex>
  );
};
