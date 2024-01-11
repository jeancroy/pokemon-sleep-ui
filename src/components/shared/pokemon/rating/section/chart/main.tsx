import React from 'react';

import {CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {Flex} from '@/components/layout/flex/common';
import {
  ratingResultChartAxisStyle,
  ratingResultChartYAxisDomain,
  ratingResultChartYAxisTickFormatter,
  ratingResultChartYAxisTicks,
} from '@/components/shared/pokemon/rating/section/chart/const';
import {RatingResultLabel} from '@/components/shared/pokemon/rating/section/chart/label';
import {RatingResultChartTooltip} from '@/components/shared/pokemon/rating/section/chart/tooltip';
import {RatingResultChartDataPoint} from '@/components/shared/pokemon/rating/section/chart/type';
import {RatingSummaryCommonProps} from '@/components/shared/pokemon/rating/type';
import {useLayout} from '@/hooks/layout/main';
import {getRatingWeightedStatsFromResult} from '@/utils/game/rating/result/weighted';
import {generateNumberTicks} from '@/utils/number/generator';
import {isNotNullish} from '@/utils/type';


export const RatingResultChart = ({
  activeKeyLevels,
  resultMap,
  config,
}: RatingSummaryCommonProps) => {
  const {basis, category} = config;
  const {isLandscape} = useLayout();

  const maxLevel = Math.max(...activeKeyLevels);
  const data = activeKeyLevels
    .map((level): RatingResultChartDataPoint | null => {
      const resultOfLevel = resultMap[level];

      if (!resultOfLevel) {
        return null;
      }

      return {
        level,
        value: getRatingWeightedStatsFromResult({
          resultOfCategory: resultOfLevel.result[category],
          basis,
        }),
      };
    })
    .filter(isNotNullish);

  return (
    <Flex className="info-section h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{top: 25, bottom: 10, right: 25, left: 0}}>
          <CartesianGrid strokeDasharray="1 1" stroke="#777777"/>
          <XAxis
            type="number"
            dataKey={({level}: RatingResultChartDataPoint) => level}
            ticks={[...generateNumberTicks({
              max: maxLevel,
              interval: isLandscape ? 5 : 10,
              start: 5,
            })]}
            domain={[1, 'dataMax']}
            dy={10}
            interval={0}
            tickFormatter={(level: number) => `Lv ${level}`}
            style={ratingResultChartAxisStyle}
          />
          <YAxis
            type="number"
            dataKey={({value}: RatingResultChartDataPoint) => value}
            ticks={ratingResultChartYAxisTicks[basis](data)}
            domain={ratingResultChartYAxisDomain[basis]}
            tickFormatter={ratingResultChartYAxisTickFormatter[basis]}
            style={ratingResultChartAxisStyle}
          />
          {basis === 'relativeStrength' && <ReferenceLine y={0} stroke="#db862c"/>}
          <Tooltip content={<RatingResultChartTooltip resultMap={resultMap} config={config}/>}/>
          <Line
            type="linear"
            dataKey={({value}: RatingResultChartDataPoint) => value}
            animationDuration={300}
            label={<RatingResultLabel basis={basis}/>}
          />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
};
