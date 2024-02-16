import React from 'react';

import {getEventInfoList} from '@/controller/event/info';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {EventIndexContent} from '@/ui/event/index/content';
import {EventIndexDataProps} from '@/ui/event/index/type';


export const EventIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const [
    eventInfoList,
  ] = await Promise.all([
    getEventInfoList(),
  ]);

  const props: EventIndexDataProps = {
    eventInfoList,
  };

  return (
    <PublicPageLayout locale={locale}>
      <EventIndexContent {...props}/>
    </PublicPageLayout>
  );
};
