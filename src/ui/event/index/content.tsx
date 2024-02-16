import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {EventIndexSection} from '@/ui/event/index/section';
import {EventIndexDataProps} from '@/ui/event/index/type';


export const EventIndexContent = ({eventInfoList}: EventIndexDataProps) => {
  const t = useTranslations('UI.InPage.Info.Event.Index');

  const currentEpochSec = Date.now() / 1000;

  return (
    <Flex className="gap-2">
      <EventIndexSection
        title={t('Section.Upcoming')}
        eventInfoList={eventInfoList.filter(({startEpoch}) => (
          startEpoch > currentEpochSec
        ))}
      />
      <EventIndexSection
        title={t('Section.Current')}
        eventInfoList={eventInfoList.filter(({startEpoch, endEpoch}) => (
          currentEpochSec >= startEpoch && currentEpochSec < endEpoch
        ))}
      />
      <EventIndexSection
        title={t('Section.Ended')}
        eventInfoList={eventInfoList.filter(({endEpoch}) => (
          currentEpochSec >= endEpoch
        ))}
      />
    </Flex>
  );
};
