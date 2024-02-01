import React from 'react';

import {Grid} from '@/components/layout/grid';
import {getBerryDataMap} from '@/controller/berry';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {BerryLink} from '@/ui/berry/index/link';


export const BerryIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const berryDataMap = await getBerryDataMap();

  return (
    <PublicPageLayout locale={locale}>
      <Grid center className="grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {Object.values(berryDataMap).map((berry) => <BerryLink key={berry.id} berryData={berry}/>)}
      </Grid>
    </PublicPageLayout>
  );
};
