import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {EventInfo} from '@/types/game/event/info';
import {EventMissionMap} from '@/types/game/event/mission';
import {EventPageMissionSection} from '@/ui/info/event/page/client/mission/section';
import {EventPageMissionCommonProps} from '@/ui/info/event/page/client/mission/type';


type Props = EventPageMissionCommonProps & {
  eventInfo: EventInfo,
  eventMissionMap: EventMissionMap,
};

export const EventPageMissions = ({eventInfo, eventMissionMap, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Info.Event.Page');

  if (!Object.keys(eventMissionMap).length) {
    return null;
  }

  return (
    <Flex className="info-section">
      <div className="text-xl">
        {t('Section.Mission')}
      </div>
      {Object.entries(eventMissionMap).map(([eventId, missions]) => {
        if (!missions) {
          return null;
        }

        return (
          <EventPageMissionSection
            key={eventId}
            eventId={Number(eventId)}
            eventInfo={eventInfo}
            missions={missions}
            {...props}
          />
        );
      })}
    </Flex>
  );
};
