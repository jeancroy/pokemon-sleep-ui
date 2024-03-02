import React from 'react';

import {InfoIcon} from '@/components/icons/info';
import {LoadingSvg} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {RatingDetailsButtonCompleted} from '@/components/shared/pokemon/rating/section/details/button/completed';
import {RatingResultOfCategoryAtLevel} from '@/types/game/pokemon/rating/result';


type Props = {
  level: number,
  loading: boolean,
  result: RatingResultOfCategoryAtLevel,
};

export const RatingDetailsButton = ({level, loading, result}: Props) => {
  return (
    <Flex direction="row" className="items-center gap-1.5 p-1">
      <InfoIcon style="glow" dimension="size-7" className="shrink-0" classTextSize="text-sm">
        {level}
      </InfoIcon>
      <Flex center className="gap-1.5 md:flex-row">
        {loading ? <LoadingSvg className="size-6"/> : <RatingDetailsButtonCompleted result={result}/>}
      </Flex>
    </Flex>
  );
};
