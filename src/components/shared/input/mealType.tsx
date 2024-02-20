import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {
  getSingleSelectOnClickProps,
  GetSingleSelectOnClickPropsOpts,
} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {mealTypeDotStyle} from '@/styles/game/mealType';
import {textFilterButtonStyle} from '@/styles/input';
import {MealTypeId} from '@/types/game/meal/main';


type Props<TFilter> = Omit<GetSingleSelectOnClickPropsOpts<TFilter, MealTypeId | null>, 'allowNull'> & {
  mealTypes: MealTypeId[],
};

export const MealTypeInput = <TFilter, >({mealTypes, ...props}: Props<TFilter>) => {
  const t = useTranslations('UI.InPage.Cooking');
  const t2 = useTranslations('Game.MealType');

  return (
    <FilterExpandedInput
      style="highlight"
      title={t('MealType')}
      ids={[null, ...mealTypes]}
      idToButton={(id) => {
        if (id === null) {
          return <XMarkIcon className="size-5"/>;
        }

        return (
          <Flex noFullWidth direction="row" className="gap-1" center>
            <div className={clsx('size-3 rounded-full', mealTypeDotStyle[id])}/>
            <div>{t2(id.toString())}</div>
          </Flex>
        );
      }}
      className={textFilterButtonStyle}
      {...getSingleSelectOnClickProps({
        ...props,
        allowNull: false,
      })}
    />
  );
};
