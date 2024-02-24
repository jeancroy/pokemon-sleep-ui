import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {PotInfo} from '@/types/game/potInfo';
import {toUnique} from '@/utils/array';


type Props = FilterInputOnClickProps<number> & {
  potInfoList: PotInfo[],
};

export const PotCapacityInput = ({potInfoList, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <FilterTextInput
      title={t('PotCapacity')}
      ids={toUnique(potInfoList.map(({capacity}) => capacity)).sort((a, b) => a - b)}
      idToText={(id) => id.toString()}
      {...props}
    />
  );
};
