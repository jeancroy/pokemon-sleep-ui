'use client';
import React from 'react';

import {useCommonServerData} from '@/contexts/data/common/hook';
import {EventPageDrowsyPowerMultiplier} from '@/ui/info/event/page/client/drowsyPowerMultiplier';
import {EventPageMeta} from '@/ui/info/event/page/client/meta';
import {EventPageMissions} from '@/ui/info/event/page/client/mission/main';
import {EventPageStrengthMultiplier} from '@/ui/info/event/page/client/strengthMultiplier';
import {EventPageDataProps} from '@/ui/info/event/page/type';


export const EventPageClient = ({
  eventInfo,
  eventMissionMap,
  strengthMultiplierEntries,
  drowsyPowerMultiplierEntries,
}: EventPageDataProps) => {
  const {pokedexMap} = useCommonServerData();

  return (
    <>
      <EventPageMeta eventInfo={eventInfo}/>
      <EventPageMissions eventInfo={eventInfo} pokedexMap={pokedexMap} eventMissionMap={eventMissionMap}/>
      <EventPageStrengthMultiplier strengthMultiplierEntries={strengthMultiplierEntries}/>
      <EventPageDrowsyPowerMultiplier drowsyPowerMultiplierEntries={drowsyPowerMultiplierEntries}/>
    </>
  );
};
