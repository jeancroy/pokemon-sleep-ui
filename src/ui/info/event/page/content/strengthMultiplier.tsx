import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {StrengthMultiplierTypeIcon} from '@/components/shared/icon/multiplier/strength';
import {strengthMultiplierTypeI18nId} from '@/const/game/multiplier';
import {strengthMultiplierType} from '@/types/game/bonus/strength';
import {EventStrengthMultiplierEntry} from '@/types/game/event/strengthMultiplier';
import {EventPageTimePeriodUnit} from '@/ui/info/event/page/common/timePeriodUnit';
import {formatFloat} from '@/utils/number/format/regular';


type Props = {
  strengthMultiplierEntries: EventStrengthMultiplierEntry[],
};

export const EventPageStrengthMultiplier = ({strengthMultiplierEntries}: Props) => {
  const t = useTranslations('UI.Multiplier');

  if (!strengthMultiplierEntries.length) {
    return null;
  }

  return (
    <Flex className="info-section">
      <div className="text-xl">
        {t('Strength.Name')}
      </div>
      <Grid className="grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
        {strengthMultiplierEntries.map((entry) => (
          <EventPageTimePeriodUnit
            key={entry.internalId}
            data={entry}
            renderData={(entry) => (
              <Flex direction="row" className="gap-1.5">
                {strengthMultiplierType.map((type) => {
                  const multiplier = entry[type];

                  // Skip showing if it's default
                  if (multiplier === 1) {
                    return null;
                  }

                  const typeName = t(strengthMultiplierTypeI18nId[type]);

                  return (
                    <Flex key={type} direction="row" className="items-end gap-1" noFullWidth>
                      <StrengthMultiplierTypeIcon alt={typeName} type={type} dimension="size-6"/>
                      <span>{typeName}</span>
                      <span className="text-xl">{formatFloat(multiplier)}x</span>
                    </Flex>
                  );
                })}
              </Flex>
            )}
          />
        ))}
      </Grid>
    </Flex>
  );
};
