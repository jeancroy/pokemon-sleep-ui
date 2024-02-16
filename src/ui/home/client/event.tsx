import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {EventInfoList} from '@/components/shared/event/infoList';
import {HomeDataProps} from '@/ui/home/type';


export const HomeEventList = ({eventInfoList}: HomeDataProps) => {
  const t = useTranslations('UI.InPage.Info.Event.Index');

  return (
    <Flex className="info-section">
      <div className="text-xl">{t('Section.Current')}</div>
      <EventInfoList eventInfoList={eventInfoList}/>
    </Flex>
  );
};
