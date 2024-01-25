import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {Flex} from '@/components/layout/flex/common';
import {mealTypeDotStyle} from '@/styles/game/mealType';
import {textFilterButtonStyle} from '@/styles/input';
import {MealTypeId} from '@/types/game/meal/main';


type Props = FilterInputOnClickProps<MealTypeId> & {
  mealTypes: MealTypeId[],
};

export const MealTypeInput = ({mealTypes, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');
  const t2 = useTranslations('Game.MealType');

  return (
    <FilterExpandedInput
      style="highlight"
      title={t('MealType')}
      ids={mealTypes}
      idToButton={(id) => (
        <Flex noFullWidth direction="row" className="gap-1" center>
          <div className={clsx('size-3 rounded-full', mealTypeDotStyle[id])}/>
          <div>{t2(id.toString())}</div>
        </Flex>
      )}
      className={textFilterButtonStyle}
      {...props}
    />
  );
};
