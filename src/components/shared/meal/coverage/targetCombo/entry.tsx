import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {MealCoverageDetails} from '@/components/shared/meal/coverage/details/main';
import {MealCoverageTargetComboMealInfo} from '@/components/shared/meal/coverage/targetCombo/mealInfo';
import {MealCoverageComboData} from '@/components/shared/meal/coverage/targetCombo/type';


type Props = {
  data: MealCoverageComboData,
};

export const MealCoverageTargetComboEntry = ({data}: Props) => {
  const {
    coverage,
  } = data;

  return (
    <Flex className="gap-1 border-b-gray-600 p-2 not-last:border-b">
      <MealCoverageTargetComboMealInfo data={data}/>
      <MealCoverageDetails coverage={coverage}/>
    </Flex>
  );
};
