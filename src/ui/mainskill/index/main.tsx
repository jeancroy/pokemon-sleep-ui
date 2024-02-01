import React from 'react';

import {Grid} from '@/components/layout/grid';
import {getAllMainSkillData} from '@/controller/mainSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MainSkillLink} from '@/ui/mainskill/index/link';


export const MainSkillIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    mainSkills,
  ] = await Promise.all([
    getAllMainSkillData(),
  ]);

  return (
    <PublicPageLayout locale={locale}>
      <Grid className="grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {mainSkills.map((data) => (
          <MainSkillLink key={data.id} data={data}/>
        ))}
      </Grid>
    </PublicPageLayout>
  );
};
