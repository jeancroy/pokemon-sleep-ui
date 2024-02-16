import React from 'react';

import {EventPageParams} from '@/app/[locale]/info/event/[identifier]/page';
import {Failed} from '@/components/icons/failed';
import {getEventDrowsyPowerMultiplierOfEvents} from '@/controller/event/drowsyPowerMultiplier';
import {getEventInfo} from '@/controller/event/info';
import {getEventMissionMap} from '@/controller/event/mission';
import {getEventStrengthMultiplierOfEvents} from '@/controller/event/strengthMultiplier';
import {getPokedexMap} from '@/controller/pokemon/info';
import {PageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {EventPageContent} from '@/ui/info/event/page/content/main';
import {EventPageDataProps} from '@/ui/info/event/page/type';


export const EventPage = async ({params}: PageProps<EventPageParams>) => {
  const {locale, identifier} = params;

  const eventInfo = await getEventInfo(identifier);
  if (!eventInfo) {
    return <Failed text="Event Info"/>;
  }

  const eventIds = eventInfo.associatedInternalId;

  const [
    pokedexMap,
    eventMissionMap,
    strengthMultiplierEntries,
    drowsyPowerMultiplierEntries,
  ] = await Promise.all([
    getPokedexMap(),
    getEventMissionMap({eventIds}),
    getEventStrengthMultiplierOfEvents({eventIds}),
    getEventDrowsyPowerMultiplierOfEvents({eventIds}),
  ]);

  const props: EventPageDataProps = {
    eventInfo,
    pokedexMap,
    eventMissionMap,
    strengthMultiplierEntries,
    drowsyPowerMultiplierEntries,
  };

  return (
    <PublicPageLayout locale={locale}>
      <EventPageContent {...props}/>
    </PublicPageLayout>
  );
};
