import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {MealCoverageAllRecipesTargetInfo} from '@/components/shared/meal/coverage/allRecipes/targetInfo';
import {MealCoverageDetails} from '@/components/shared/meal/coverage/details/main';
import {MealCoverage} from '@/types/game/cooking';
import {Meal} from '@/types/game/meal/main';


type Props = {
  targets: Meal[],
  coverage: MealCoverage,
};

export const MealCoverageAllRecipesEntry = ({targets, coverage}: Props) => {
  return (
    <Flex className="gap-1 border-b-gray-600 p-2 not-last:border-b">
      <MealCoverageAllRecipesTargetInfo targets={targets}/>
      <MealCoverageDetails coverage={coverage}/>
    </Flex>
  );
};
