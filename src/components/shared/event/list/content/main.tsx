import React from 'react';

import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {EventInfoSection} from '@/components/shared/event/list/content/section';
import {toEventListGroupedData} from '@/components/shared/event/list/content/utils';
import {EventListContentCommonProps} from '@/components/shared/event/list/type';


export const EventListContent = ({eventInfoList, ...props}: EventListContentCommonProps) => {
  const t = useTranslations('UI.Component.EventList');

  const {upcoming, current, ended} = toEventListGroupedData(eventInfoList);

  if (!upcoming.length && !current.length && !ended.length) {
    return null;
  }

  return (
    <AnimatedCollapse show appear>
      <Flex className="gap-2">
        <EventInfoSection
          title={t('Section.Upcoming')}
          eventInfoList={upcoming}
          {...props}
        />
        <EventInfoSection
          title={t('Section.Current')}
          eventInfoList={current}
          {...props}
        />
        <EventInfoSection
          title={t('Section.Ended')}
          eventInfoList={ended}
          {...props}
        />
      </Flex>
    </AnimatedCollapse>
  );
};
