import React from 'react';

import {useTranslations} from 'next-intl';

import {Countdown} from '@/components/countdown/main/main';
import {Flex} from '@/components/layout/flex/common';
import {TimePeriodSchedule} from '@/components/shared/timePeriod/schedule';
import {EventInfo} from '@/types/game/event/info';
import {toTimePeriodInDate} from '@/utils/timePeriod';


type Props = {
  eventInfo: EventInfo,
};

export const EventPageMeta = ({eventInfo}: Props) => {
  const {i18nKey} = eventInfo;

  const t = useTranslations('Game.EventDetail');
  const timePeriodInDate = toTimePeriodInDate(eventInfo);

  return (
    <Flex center className="info-section">
      <div className="text-3xl">{t(i18nKey.name)}</div>
      <Countdown timePeriodInDate={timePeriodInDate} className="bg-plate text-2xl"/>
      <TimePeriodSchedule
        timePeriodInDate={timePeriodInDate}
        className="border-separate border-spacing-x-3 text-left"
        showDuration
      />
    </Flex>
  );
};
