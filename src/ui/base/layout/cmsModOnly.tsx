import React from 'react';

import {getServerSession} from 'next-auth';

import {redirect} from '@/components/i18n/exports';
import {authOptions} from '@/const/auth';
import {isCmsMod} from '@/controller/user/account/common';
import {PageLayout} from '@/ui/base/layout/common';
import {UiPageProps} from '@/ui/base/layout/type';


export const CmsModOnlyPageLayout = ({children, ...props}: React.PropsWithChildren<UiPageProps>) => {
  const session = React.use(getServerSession(authOptions));

  if (!isCmsMod(session?.user.id)) {
    redirect('/');
  }

  return (
    <PageLayout noPageEndAds {...props}>
      {children}
    </PageLayout>
  );
};
