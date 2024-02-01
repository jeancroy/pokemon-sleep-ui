import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {MealPreparerInfo} from '@/ui/cooking/prepare/hook/type';
import {MealPrepareOfMealType} from '@/ui/cooking/prepare/mealType/ofType';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';


type Props = MealPreparerCommonProps & {
  info: MealPreparerInfo,
};

export const MealPreparerByMealTypes = ({info, ...props}: Props) => {
  const {mealTypes} = props;

  return (
    <Flex className="gap-2">
      {mealTypes.map((mealType) => (
        <React.Fragment key={mealType}>
          <AdsUnit hideIfNotBlocked/>
          <MealPrepareOfMealType mealType={mealType} info={info[mealType]} {...props}/>
        </React.Fragment>
      ))}
    </Flex>
  );
};
