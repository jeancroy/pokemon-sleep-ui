import React from 'react';

import ArrowUpRightIcon from '@heroicons/react/24/outline/ArrowUpRightIcon';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  mealId: number,
};

export const CookingExternalLink = ({mealId}: Props) => {
  return (
    <a href={`/meal/${mealId}`} className="button-clickable-bg size-5 p-1" target="_blank">
      <Flex center className="h-full">
        <ArrowUpRightIcon/>
      </Flex>
    </a>
  );
};
