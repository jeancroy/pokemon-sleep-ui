import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {EventInfoUnit} from '@/components/shared/event/list/content/unit';
import {EventListContentCommonProps} from '@/components/shared/event/list/type';


type Props = EventListContentCommonProps & {
  title: string,
};

export const EventInfoSection = ({title, eventInfoList, hideOnEmpty}: Props) => {
  if (hideOnEmpty && !eventInfoList.length) {
    return null;
  }

  return (
    <Flex className="info-section">
      <div className="text-xl">{title}</div>
      {
        eventInfoList.length ?
          <Grid className="grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
            {eventInfoList.map((info) => (
              <EventInfoUnit key={info.eventIdentifier} info={info}/>
            ))}
          </Grid> :
          <XCircleIcon className="size-8"/>
      }
    </Flex>
  );
};
