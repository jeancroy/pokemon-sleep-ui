import React from 'react';

import {EventPageDrowsyPowerMultiplier} from '@/ui/event/page/content/drowsyPowerMultiplier';
import {EventPageMeta} from '@/ui/event/page/content/meta';
import {EventPageMissions} from '@/ui/event/page/content/mission/main';
import {EventPageStrengthMultiplier} from '@/ui/event/page/content/strengthMultiplier';
import {EventPageDataProps} from '@/ui/event/page/type';


export const EventPageContent = ({
  eventInfo,
  pokedexMap,
  eventMissionMap,
  strengthMultiplierEntries,
  drowsyPowerMultiplierEntries,
}: EventPageDataProps) => {
  return (
    <>
      <EventPageMeta eventInfo={eventInfo}/>
      <EventPageMissions eventInfo={eventInfo} pokedexMap={pokedexMap} eventMissionMap={eventMissionMap}/>
      <EventPageStrengthMultiplier strengthMultiplierEntries={strengthMultiplierEntries}/>
      <EventPageDrowsyPowerMultiplier drowsyPowerMultiplierEntries={drowsyPowerMultiplierEntries}/>
    </>
  );
};
