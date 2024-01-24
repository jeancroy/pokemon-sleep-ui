import React from 'react';

import {useTranslations} from 'next-intl';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {Flex} from '@/components/layout/flex/common';
import {StaminaChartCommonProps} from '@/components/shared/stamina/chart/type';
import {generateTimingTicks, toFormattedTimeFromTiming} from '@/components/shared/stamina/chart/utils';
import {useLayout} from '@/hooks/layout/main';
import {StaminaEventLogFlattened} from '@/types/game/stamina/event';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


type Props = StaminaChartCommonProps & {
  titleI18nId: I18nMessageKeysOfNamespace<'UI.Stamina'>,
  getData: (log: StaminaEventLogFlattened) => number,
  domainMin: number,
  tooltip: React.ReactElement,
  dataTicks?: number[],
  tickFormatter?: (value: number) => string,
};

export const StaminaChart = ({
  config,
  logs,
  titleI18nId,
  getData,
  domainMin,
  tooltip,
  dataTicks,
  tickFormatter,
}: Props) => {
  const {sleepSession} = config;

  const t = useTranslations('UI.Stamina');
  const {isLandscape} = useLayout();

  const start = sleepSession.primary.end;
  const maxData = Math.max(...logs.map(getData), ...(dataTicks ?? []));

  // Line type: https://d3js.org/d3-shape/curve
  return (
    <Flex className="info-section h-80">
      <div className="text-xl">
        {t(titleI18nId)}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={logs} syncId="syncChartId" margin={{top: 30, bottom: 15, right: 40, left: -10}}>
          <CartesianGrid strokeDasharray="1 1" stroke="#777777"/>
          <XAxis
            type="number"
            dataKey={({timing}: StaminaEventLogFlattened) => timing}
            ticks={generateTimingTicks({isLandscape, max: Math.max(...logs.map(({timing}) => timing))})}
            tickFormatter={(timing: number) => toFormattedTimeFromTiming({timing, start})}
            domain={[0, 'dataMax']}
            dy={10}
            interval={0}
          />
          <YAxis
            type="number"
            dataKey={getData}
            ticks={dataTicks}
            interval={0}
            domain={[domainMin, 'dataMax']}
            tickFormatter={tickFormatter}
          />
          <Tooltip content={tooltip}/>
          <Area
            type="linear"
            dataKey={getData}
            animationDuration={300}
            fillOpacity={0.6}
            dot={false}
          />
          <Area
            type="linear"
            dataKey={({isAsleep}: StaminaEventLogFlattened) => isAsleep ? maxData : null}
            animationDuration={300}
            fillOpacity={0.13}
            dot={false}
            activeDot={false}
            fill="#777777"
            stroke="none"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};
