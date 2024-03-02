'use client';
import React from 'react';


import {Flex} from '@/components/layout/flex/common';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {RecipeLevelInfoInputUI} from '@/ui/info/recipeLevel/input';
import {RecipeLevelDataTable} from '@/ui/info/recipeLevel/table/main';
import {RecipeLevelInfoInput} from '@/ui/info/recipeLevel/type';
import {getRecipeLevelDataToShow} from '@/ui/info/recipeLevel/utils';


export const RecipeLevelInfoClient = () => {
  const {recipeLevelData} = useCommonServerData();

  const [input, setInput] = React.useState<RecipeLevelInfoInput>({
    currentLevel: 1,
  });

  return (
    <Flex className="gap-1 self-center md:w-fit md:items-center">
      <RecipeLevelInfoInputUI input={input} setInput={setInput} recipeLevelData={recipeLevelData}/>
      <RecipeLevelDataTable
        data={getRecipeLevelDataToShow({input, recipeLevelData})}
      />
    </Flex>
  );
};
