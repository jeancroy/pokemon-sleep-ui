import React from 'react';

import {useTranslations} from 'next-intl';

import {Countdown} from '@/components/countdown/main/main';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {TimePeriodSchedule} from '@/components/shared/timePeriod/schedule';
import {EventInfo} from '@/types/game/event/info';
import {EventMission} from '@/types/game/event/mission';
import {EventPageMissionEntry} from '@/ui/info/event/page/client/mission/entry';
import {EventPageMissionCommonProps} from '@/ui/info/event/page/client/mission/type';
import {toTimePeriodInDate} from '@/utils/timePeriod';


type Props = EventPageMissionCommonProps & {
  eventId: number,
  eventInfo: EventInfo,
  missions: EventMission[],
};

export const EventPageMissionSection = ({eventId, eventInfo, missions, ...props}: Props) => {
  const {eventPeriod, i18nKey} = eventInfo;

  const t = useTranslations('Game.EventDetail');

  const period = eventPeriod[eventId];
  const name = i18nKey.short[eventId];
  const timePeriodInDate = toTimePeriodInDate(period);

  return (
    <Flex className="info-section">
      <Flex direction="row" className="justify-between">
        <div className="text-xl">{t(name)}</div>
        <TimePeriodSchedule
          timePeriodInDate={timePeriodInDate}
          className="w-fit border-separate border-spacing-x-3 text-left text-sm"
        />
      </Flex>
      <Countdown timePeriodInDate={timePeriodInDate} className="bg-plate"/>
      <Grid className="grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
        {missions.map((mission) => (
          <EventPageMissionEntry key={mission.internalId} mission={mission} {...props}/>
        ))}
      </Grid>
    </Flex>
  );
};
