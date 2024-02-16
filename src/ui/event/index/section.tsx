import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {EventInfo} from '@/types/game/event/info';
import {EventInfoUnit} from '@/ui/event/index/unit';


type Props = {
  title: string,
  eventInfoList: EventInfo[],
};

export const EventIndexSection = ({title, eventInfoList}: Props) => {
  return (
    <Flex className="info-section">
      <div className="text-xl">{title}</div>
      <Grid className="grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
        {eventInfoList.map((info) => (
          <EventInfoUnit key={info.eventIdentifier} info={info}/>
        ))}
      </Grid>
    </Flex>
  );
};
