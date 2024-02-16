import React from 'react';

import {Countdown} from '@/components/countdown/main/main';
import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {TimePeriodSchedule} from '@/components/shared/timePeriod/schedule';
import {TimePeriod} from '@/types/game/timePeriod';
import {toTimePeriodInDate} from '@/utils/timePeriod';


type Props<TData extends TimePeriod> = {
  data: TData,
  renderData: (data: TData) => React.ReactNode,
};

export const EventPageTimePeriodUnit = <TData extends TimePeriod>({data, renderData}: Props<TData>) => {
  const timePeriodInDate = toTimePeriodInDate(data);

  return (
    <Flex className="bg-plate gap-1">
      {renderData(data)}
      <Countdown timePeriodInDate={timePeriodInDate} className="bg-plate"/>
      <HorizontalSplitter/>
      <TimePeriodSchedule timePeriodInDate={timePeriodInDate} className="text-sm"/>
    </Flex>
  );
};
