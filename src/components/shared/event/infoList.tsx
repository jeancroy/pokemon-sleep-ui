import React from 'react';

import {Grid} from '@/components/layout/grid';
import {EventInfoUI} from '@/components/shared/event/info';
import {EventInfo} from '@/types/game/event/info';


type Props = {
  eventInfoList: EventInfo[],
};

export const EventInfoList = ({eventInfoList}: Props) => {
  return (
    <Grid className="grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
      {eventInfoList.map((info) => (
        <EventInfoUI key={info.eventIdentifier} info={info}/>
      ))}
    </Grid>
  );
};
