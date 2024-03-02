import React from 'react';

import {TooltipProps} from 'recharts/types/component/Tooltip';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {RatingResultMap} from '@/components/shared/pokemon/rating/type';
import {RankingResultPercentile} from '@/components/shared/pokemon/rating/units/percentile';
import {RatingRelativeStrength} from '@/components/shared/pokemon/rating/units/relativeStrength';
import {RatingConfig} from '@/types/game/pokemon/rating/config';


type Props = TooltipProps<number, number> & {
  resultMap: RatingResultMap,
  config: RatingConfig,
};

export const RatingResultChartTooltip = ({active, payload, label, resultMap, config}: Props) => {
  const level = label as number;
  const result = resultMap[level];

  if (!active || !payload || !payload.length || !result) {
    return null;
  }

  const data = payload[0];

  if (data.value === undefined) {
    return null;
  }

  const {category} = config;
  const {percentile, baseDiffPercent} = result.result[category];

  return (
    <Flex direction="row" noFullWidth className="info-section items-center gap-2">
      <InfoIcon style="glow" dimension="size-7" classTextSize="text-base">
        {level}
      </InfoIcon>
      <Flex className="gap-1">
        <RankingResultPercentile
          percentile={percentile}
          classOfMark="text-sm"
          classOfValue="text-2xl"
          classBarHeight="h-1.5"
          noFullWidth={false}
        />
        <RatingRelativeStrength baseDiffPercent={baseDiffPercent}/>
      </Flex>
    </Flex>
  );
};
