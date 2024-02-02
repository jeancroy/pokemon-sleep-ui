import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {MealCoverageComboMealInfo} from '@/components/shared/meal/coverage/combo/mealInfo';
import {MealCoverageComboData} from '@/components/shared/meal/coverage/combo/type';
import {MealCoverageDetails} from '@/components/shared/meal/coverage/details/main';


type Props = {
  data: MealCoverageComboData,
};

export const MealCoverageComboEntry = ({data}: Props) => {
  const {
    coverage,
  } = data;

  return (
    <Flex className="gap-1 border-b-gray-600 p-2 not-last:border-b">
      <MealCoverageComboMealInfo data={data}/>
      <MealCoverageDetails coverage={coverage}/>
    </Flex>
  );
};
