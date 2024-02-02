import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {ProgressBarSingle} from '@/components/progressBar/single';
import {MealCoverageOfIngredient} from '@/components/shared/meal/coverage/details/ingredient';
import {MealCoverageSummary} from '@/components/shared/meal/coverage/summary';
import {MealCoverageSummaryCommonProps} from '@/components/shared/meal/coverage/type';


export const MealCoverageDetails = ({className, ...props}: MealCoverageSummaryCommonProps) => {
  const {coverage} = props;

  return (
    <Flex className={clsx('items-center gap-1.5 md:flex-row', className)}>
      <Flex className="gap-1.5">
        <Flex direction="row" noFullWidth wrap className="items-center justify-between gap-1.5">
          {Object.entries(coverage.byIngredient).map(([id, coverage]) => {
            if (coverage == null) {
              return null;
            }

            return <MealCoverageOfIngredient key={id} id={parseInt(id)} coverage={coverage}/>;
          })}
        </Flex>
        <ProgressBarSingle percent={coverage.total * 100} classBarHeight="h-2"/>
      </Flex>
      <MealCoverageSummary dimension="size-7" className="text-xl" {...props}/>
    </Flex>
  );
};
