import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {RecipeLevelDataHeader} from '@/ui/info/recipeLevel/table/header';
import {RecipeLevelDataRow} from '@/ui/info/recipeLevel/table/row';
import {RecipeLevelDataToShow} from '@/ui/info/recipeLevel/type';


type Props = {
  data: RecipeLevelDataToShow[],
};

export const RecipeLevelDataTable = ({data}: Props) => {
  return (
    <Flex className="overflow-x-auto overflow-y-hidden">
      <table className={clsx(
        'info-section-bg border-separate border-spacing-0.5 rounded-lg p-2 text-center [&_td]:px-1.5',
      )}>
        <thead>
          <RecipeLevelDataHeader/>
        </thead>
        <tbody>
          {data.map((entry) => <RecipeLevelDataRow key={entry.level} entry={entry}/>)}
        </tbody>
      </table>
    </Flex>
  );
};
