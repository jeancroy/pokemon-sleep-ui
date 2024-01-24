import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {StaminaChartTooltipCommonProps} from '@/components/shared/stamina/chart/tooltip/type';
import {toFormattedTimeFromTiming} from '@/components/shared/stamina/chart/utils';
import {staminaEventTypeI18nId} from '@/const/game/stamina';


type Props = StaminaChartTooltipCommonProps & {
  getInfo: (value: number) => React.ReactNode,
};

export const StaminaChartTooltip = ({active, payload, label, logs, start, getInfo}: Props) => {
  const t = useTranslations('UI.Stamina.EventType');
  const t2 = useTranslations('UI.Stamina.State');

  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0];
  const log = logs.find(({timing}) => timing === label);

  // `data.value` could be `0`, therefore explicitly checking here
  if (!log || data.value === undefined) {
    return null;
  }

  const timing = label as number;
  const {type, isAsleep} = log;
  const textAsleep = t2('Asleep');

  return (
    <Flex noFullWidth className="info-section w-40">
      <Flex direction="row" className="items-center gap-1 whitespace-nowrap">
        <div>
          {toFormattedTimeFromTiming({timing, start})}
        </div>
        {
          isAsleep &&
          <Flex direction="row" noFullWidth>
            <GenericIconLarger src="/images/generic/sleep.png" alt={textAsleep}/>
            <span>{textAsleep}</span>
          </Flex>
        }
      </Flex>
      {getInfo(data.value)}
      {type && <span>{t(staminaEventTypeI18nId[type])}</span>}
    </Flex>
  );
};
