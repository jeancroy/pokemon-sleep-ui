import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Countdown} from '@/components/countdown/main/main';
import {FlexLink} from '@/components/layout/flex/link';
import {TimePeriodSchedule} from '@/components/shared/timePeriod/schedule';
import {EventInfo} from '@/types/game/event/info';
import {toTimePeriodInDate} from '@/utils/timePeriod';


type Props = {
  info: EventInfo,
};

export const EventInfoUI = ({info}: Props) => {
  const {
    eventIdentifier,
    i18nKey,
  } = info;

  const t = useTranslations('Game.EventDetail');
  const timePeriodInDate = toTimePeriodInDate(info);

  return (
    <FlexLink href={`/info/event/${eventIdentifier}`} direction="col" className={clsx(
      'button-clickable-bg group justify-between gap-1 p-2',
    )}>
      <div className="text-lg">{t(i18nKey.name)}</div>
      <Countdown timePeriodInDate={timePeriodInDate}/>
      <TimePeriodSchedule timePeriodInDate={timePeriodInDate} className="text-sm"/>
    </FlexLink>
  );
};
