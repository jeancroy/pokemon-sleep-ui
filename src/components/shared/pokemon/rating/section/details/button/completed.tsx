import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {RankingResultPercentage} from '@/components/shared/pokemon/rating/units/percentage';
import {RankingResultPercentile} from '@/components/shared/pokemon/rating/units/percentile';
import {RatingResultRank} from '@/components/shared/pokemon/rating/units/rank';
import {RatingRelativeStrength} from '@/components/shared/pokemon/rating/units/relativeStrength';
import {RatingResultOfCategoryAtLevel} from '@/types/game/pokemon/rating/result';


type Props = {
  result: RatingResultOfCategoryAtLevel,
};

export const RatingDetailsButtonCompleted = ({result}: Props) => {
  const {
    percentile,
    percentage,
    baseDiffPercent,
    rank,
    samples,
  } = result;

  return (
    <Flex className="gap-1.5 md:flex-row">
      <Flex direction="row" className="items-center">
        <RankingResultPercentile
          percentile={percentile}
          classOfMark="text-sm"
          classOfValue="text-3xl"
          classBarHeight="h-1.5"
          noFullWidth={false}
        />
        <RatingRelativeStrength
          baseDiffPercent={baseDiffPercent}
          className="text-xl"
          noFullWidth={false}
        />
      </Flex>
      <Flex direction="row" className="items-center">
        <RankingResultPercentage
          percentage={percentage}
          classOfValue="text-lg"
          classBarHeight="h-1.5"
          noFullWidth={false}
        />
        <RatingResultRank
          rank={rank}
          samples={samples}
          classTextOfRank="text-lg"
          className="justify-center text-sm"
          noFullWidth={false}
        />
      </Flex>
    </Flex>
  );
};
