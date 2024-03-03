import React from 'react';

import {I18nProvider} from '@/components/i18n/provider';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {SandboxClient} from '@/ui/sandbox/client';


export const Sandbox = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game']}>
        <SandboxClient/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
