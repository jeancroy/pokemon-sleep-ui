import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {EventDrowsyPowerMultiplierEntry} from '@/types/game/event/drowsyPowerMultiplier';
import {EventPageTimePeriodUnit} from '@/ui/event/page/common/timePeriodUnit';


type Props = {
  drowsyPowerMultiplierEntries: EventDrowsyPowerMultiplierEntry[],
};

export const EventPageDrowsyPowerMultiplier = ({drowsyPowerMultiplierEntries}: Props) => {
  const t = useTranslations('UI.Multiplier');

  if (!drowsyPowerMultiplierEntries.length) {
    return null;
  }

  return (
    <Flex className="info-section">
      <div className="text-xl">
        {t('DrowsyPower')}
      </div>
      <Grid className="grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
        {drowsyPowerMultiplierEntries.map((entry) => (
          <EventPageTimePeriodUnit
            key={entry.internalId}
            data={entry}
            renderData={({multiplier}) => (
              <Flex direction="row" className="gap-1.5 text-xl">
                {multiplier}
              </Flex>
            )}
          />
        ))}
      </Grid>
    </Flex>
  );
};
