import React from 'react';

import {Announcements} from '@/components/announcement/main';
import {I18nProvider} from '@/components/i18n/provider';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {getUserCount} from '@/controller/auth';
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
  ] = await Promise.all([
    getUserCount(),
    getPaidUserCount(),
  ]);

  const props: HomeDataProps = {
    userCount,
    paidUserCount,
  };

  return (
    <PublicPageLayout locale={locale} announcement={false}>
      <Announcements showOn="always" larger height="h-24"/>
      <HorizontalSplitter/>
      <I18nProvider
        locale={locale}
        namespaces={[
          'Game',
          'UI.Component.EventList',
          'UI.Component.TimePeriodSchedule',
          'UI.Metadata',
          'UI.InPage.Home',
        ]}>
        <HomeClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
