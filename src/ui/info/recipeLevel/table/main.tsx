import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {RecipeLevelDataHeader} from '@/ui/info/recipeLevel/table/header';
import {RecipeLevelDataRow} from '@/ui/info/recipeLevel/table/row';


type Props = {
  recipeLevelData: RecipeLevelData[],
};

export const RecipeLevelDataTable = ({recipeLevelData}: Props) => {
  return (
    <Flex className={clsx(
      'info-section-bg self-center overflow-x-auto overflow-y-hidden rounded-lg p-2 md:w-fit md:items-center',
    )}>
      <table className="border-separate border-spacing-0.5 text-center [&_td]:px-1.5">
        <thead>
          <RecipeLevelDataHeader/>
        </thead>
        <tbody>
          {recipeLevelData.map((data) => <RecipeLevelDataRow key={data.level} data={data}/>)}
        </tbody>
      </table>
    </Flex>
  );
};
