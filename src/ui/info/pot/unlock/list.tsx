import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {Grid} from '@/components/layout/grid';
import {MealLink} from '@/components/shared/meal/link/main';
import {MealDetails} from '@/types/game/meal/main';
import {PotInfoFilter} from '@/ui/info/pot/type';


type Props = {
  filter: PotInfoFilter,
  mealDetails: MealDetails[],
};

export const PotRecipeUnlockList = ({filter, mealDetails}: Props) => {
  const {showStats} = filter;

  if (!mealDetails.length) {
    return <XCircleIcon className="m-auto size-10"/>;
  }

  return (
    <Grid className="grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {mealDetails.map((entry) => (
        <MealLink
          key={entry.meal.id}
          mealDetails={entry}
          showStats={showStats}
        />
      ))}
    </Grid>
  );
};
