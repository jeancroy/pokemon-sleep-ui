'use client';
import React from 'react';

import {EventListContent} from '@/components/shared/event/list/content/main';
import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad/main';


type Props = {
  includePast: boolean,
  showLoading?: boolean,
};

export const EventList = ({includePast, showLoading}: Props) => {
  return (
    <UserDataLazyLoad
      options={{
        type: 'eventList',
        opts: {epochSec: Date.now() / 1000, includePast},
      }}
      loadingText={showLoading ? 'Event' : null}
      content={({data}) => {
        const eventInfoList = data?.eventList;

        if (!eventInfoList) {
          return null;
        }

        return <EventListContent eventInfoList={eventInfoList} hideOnEmpty={!includePast}/>;
      }}
    />
  );
};
