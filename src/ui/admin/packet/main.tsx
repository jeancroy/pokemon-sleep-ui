import React from 'react';

import {getPacketRecordingConfig} from '@/controller/packet/config';
import {DefaultPageProps} from '@/types/next/page/common';
import {AdminPacketSettingsClient} from '@/ui/admin/packet/client';
import {AdminPacketSettingsServerDataProps} from '@/ui/admin/packet/type';
import {AdminOnlyPageLayout} from '@/ui/base/layout/adminOnly';


const AdminPacketSettingsInternal = async () => {
  const props: AdminPacketSettingsServerDataProps = {
    preloaded: await getPacketRecordingConfig(),
  };

  return <AdminPacketSettingsClient {...props}/>;
};

export const AdminPacketSettings = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <AdminOnlyPageLayout locale={locale}>
      <AdminPacketSettingsInternal/>
    </AdminOnlyPageLayout>
  );
};
