import React from 'react';

import {Grid} from '@/components/layout/grid';
import {getAllSubSkillData} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {SubSkillInfoSingle} from '@/ui/info/subskill/single';
import {getSortedSubSkills} from '@/utils/game/subSkill/sort';


export const SubSkillInfo = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const subSkills = await getAllSubSkillData();

  const sortedSubSkills = getSortedSubSkills(subSkills);

  return (
    <PublicPageLayout locale={locale}>
      <Grid className="grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {sortedSubSkills.map((subSkill) => (
          <SubSkillInfoSingle key={subSkill.id} data={subSkill}/>
        ))}
      </Grid>
    </PublicPageLayout>
  );
};
