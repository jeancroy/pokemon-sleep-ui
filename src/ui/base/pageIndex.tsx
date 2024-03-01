import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {DefaultPageProps} from '@/types/next/page/common';
import {NavEntry} from '@/types/website/nav';
import {PublicPageLayout} from '@/ui/base/layout/public';


type Props = {
  pageProps: DefaultPageProps,
  entries: NavEntry[],
};

export const PageIndex = ({pageProps, entries}: Props) => {
  const {params} = pageProps;
  const {locale} = params;
  const t = useTranslations('UI.Metadata');

  return (
    <PublicPageLayout locale={locale}>
      <Flex center>
        <Grid className="h-auto grid-cols-1 gap-2 md:w-1/2">
          {entries.map(({i18nTextId, ...props}) => (
            <FeatureLinkImage key={i18nTextId} text={t(i18nTextId)} {...props}/>
          ))}
        </Grid>
      </Flex>
    </PublicPageLayout>
  );
};
