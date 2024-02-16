import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {EventInfoList} from '@/components/shared/event/infoList';
import {EventInfo} from '@/types/game/event/info';


type Props = {
  title: string,
  eventInfoList: EventInfo[],
};

export const EventIndexSection = ({title, eventInfoList}: Props) => {
  return (
    <Flex className="info-section">
      <div className="text-xl">{title}</div>
      <EventInfoList eventInfoList={eventInfoList}/>
    </Flex>
  );
};
