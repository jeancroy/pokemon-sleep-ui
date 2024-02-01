import React from 'react';

import {getServerSession} from 'next-auth';

import {DocsControl} from '@/components/shared/docs/control/main';
import {authOptions} from '@/const/auth';
import {getDocsMetadataList} from '@/controller/docs';
import {isCmsMod} from '@/controller/user/account/common';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {DocsIndexTree} from '@/ui/docs/index/tree/main';


export const DocsIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const [
    session,
    docsMetadataList,
  ] = await Promise.all([
    getServerSession(authOptions),
    getDocsMetadataList(locale),
  ]);

  return (
    <PublicPageLayout locale={locale}>
      <DocsControl locale={locale} isCmsMod={await isCmsMod(session?.user.id)}/>
      <DocsIndexTree docsMetadataList={docsMetadataList}/>
    </PublicPageLayout>
  );
};
