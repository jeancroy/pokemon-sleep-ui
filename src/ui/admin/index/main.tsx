import React from 'react';

import {FlexLink} from '@/components/layout/flex/link';
import {Grid} from '@/components/layout/grid';
import {DefaultPageProps} from '@/types/next/page/common';
import {AdminOnlyPageLayout} from '@/ui/base/layout/adminOnly';


export const SiteAdminIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <AdminOnlyPageLayout locale={locale}>
      <Grid className="grid-cols-1 gap-2 text-xl xl:grid-cols-2">
        <FlexLink href="/admin/activation" center className="button-clickable-glow h-28">
          Activation Management
        </FlexLink>
        <FlexLink href="/admin/preset" center className="button-clickable-glow h-28">
          Activation Preset
        </FlexLink>
        <FlexLink href="/admin/announcement" center className="button-clickable-glow h-28">
          Announcements
        </FlexLink>
        <FlexLink href="/admin/packet" center className="button-clickable-glow h-28">
          Packet Recording Settings
        </FlexLink>
      </Grid>
    </AdminOnlyPageLayout>
  );
};
