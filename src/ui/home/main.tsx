import React from 'react';

import {Announcements} from '@/components/announcement/main';
import {I18nProvider} from '@/components/i18n/provider';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {getUserCount} from '@/controller/auth';
import {getEventInfoList} from '@/controller/event/info';
import {getPaidUserCount} from '@/controller/user/activation/data';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {HomeClient} from '@/ui/home/client/main';
import {HomeDataProps} from '@/ui/home/type';


export const Home = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    userCount,
    paidUserCount,
    eventInfoList,
  ] = await Promise.all([
    getUserCount(),
    getPaidUserCount(),
    getEventInfoList(Date.now() / 1000),
  ]);

  const props: HomeDataProps = {
    userCount,
    paidUserCount,
    eventInfoList,
  };

  return (
    <PublicPageLayout locale={locale} announcement={false}>
      <Announcements showOn="always" larger height="h-24"/>
      <HorizontalSplitter/>
      <I18nProvider
        locale={locale}
        namespaces={[
          'Game',
          'UI.Component.TimePeriodSchedule',
          'UI.Metadata',
          'UI.InPage.Home',
          'UI.InPage.Info.Event.Index',
        ]}>
        <HomeClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
