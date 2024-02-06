import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {StaminaChartTooltip} from '@/components/shared/stamina/chart/tooltip/common';
import {StaminaChartTooltipCommonProps} from '@/components/shared/stamina/chart/tooltip/type';
import {staminaLevelImageSrc} from '@/const/game/stamina';
import {getStaminaBreakpoint} from '@/utils/game/stamina/breakpoint';
import {formatInt} from '@/utils/number/format/regular';


export const StaminaChartTooltipOfStamina = (props: StaminaChartTooltipCommonProps) => {
  const t = useTranslations('UI.Common');

  return (
    <StaminaChartTooltip
      {...props}
      getInfo={(stamina) => (
        <Flex direction="row" noFullWidth className="items-center gap-1">
          <GenericIcon src={staminaLevelImageSrc[getStaminaBreakpoint(stamina)]} alt={t('Stamina')} noInvert/>
          <div>{formatInt(stamina)}</div>
        </Flex>
      )}
    />
  );
};
