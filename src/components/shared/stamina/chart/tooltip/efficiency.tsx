import React from 'react';

import {StaminaChartTooltip} from '@/components/shared/stamina/chart/tooltip/common';
import {StaminaChartTooltipCommonProps} from '@/components/shared/stamina/chart/tooltip/type';
import {formatFloat3} from '@/utils/number/format/regular';


export const StaminaChartTooltipOfEfficiency = (props: StaminaChartTooltipCommonProps) => {
  return (
    <StaminaChartTooltip
      {...props}
      getInfo={(efficiency) => `${formatFloat3(efficiency)}x`}
    />
  );
};
