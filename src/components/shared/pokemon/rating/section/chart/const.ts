import React from 'react';

import {YAxisProps} from 'recharts';

import {RatingResultChartDataPoint} from '@/components/shared/pokemon/rating/section/chart/type';
import {RatingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';
import {generateTicksFromData} from '@/utils/chart';
import {formatFloat, formatFloat1, formatInt} from '@/utils/number/format/regular';
import {formatSignedNumber} from '@/utils/number/format/signed';
import {generateNumberTicks} from '@/utils/number/generator';


export const ratingResultChartYAxisDomain: {
  [basis in RatingWeightedStatsBasis]: YAxisProps['domain']
} = {
  percentile: [0, 100],
  percentage: [0, 100],
  relativeStrength: ['dataMin', 'dataMax'],
};

export const ratingResultChartYAxisTicks: {
  [basis in RatingWeightedStatsBasis]: (data: RatingResultChartDataPoint[]) => number[]
} = {
  percentile: () => [...generateNumberTicks({max: 100, interval: 20})],
  percentage: () => [...generateNumberTicks({max: 100, interval: 20})],
  relativeStrength: (data) => generateTicksFromData({
    data: data.map(({value}) => value),
    count: 5,
  }),
};

export const ratingResultChartYAxisTickFormatter: {
  [basis in RatingWeightedStatsBasis]: (value: RatingResultChartDataPoint['value']) => string
} = {
  percentile: (value) => `PR ${formatInt(value)}`,
  percentage: (value) => `${formatFloat(value)}%`,
  relativeStrength: (value) => `${formatSignedNumber({format: 'float', num: value}) ?? '-'}%`,
};

export const ratingResultChartLabelFormatter: {
  [basis in RatingWeightedStatsBasis]: (value: RatingResultChartDataPoint['value']) => string
} = {
  percentile: (value) => formatInt(value),
  percentage: (value) => `${formatFloat1(value)}%`,
  relativeStrength: (value) => `${formatSignedNumber({format: 'float1', num: value}) ?? '-'}%`,
};

export const ratingResultChartAxisStyle: React.CSSProperties = {
  fontSize: '0.8rem',
};
