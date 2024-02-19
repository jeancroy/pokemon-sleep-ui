import React from 'react';

import {I18nProvider} from '@/components/i18n/provider';
import {EventList} from '@/components/shared/event/list/main';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';


export const EventIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider
        locale={locale}
        namespaces={[
          'Game',
          'UI.Component.TimePeriodSchedule',
          'UI.Component.EventList',
        ]}
      >
        <EventList includePast showLoading/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
