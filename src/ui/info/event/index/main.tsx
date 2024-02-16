import React from 'react';

import {I18nProvider} from '@/components/i18n/provider';
import {getEventInfoList} from '@/controller/event/info';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {EventIndexClient} from '@/ui/info/event/index/client';
import {EventIndexDataProps} from '@/ui/info/event/index/type';


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
      <I18nProvider
        locale={locale}
        namespaces={[
          'Game',
          'UI.Component.TimePeriodSchedule',
          'UI.InPage.Info.Event.Index',
        ]}
      >
        <EventIndexClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
