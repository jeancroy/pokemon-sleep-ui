import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {ResearchRankInfoTable} from '@/ui/info/researchRank/table/main';
import {ResearchRankInfoDataProps} from '@/ui/info/researchRank/type';


export const ResearchRankInfoContent = (props: ResearchRankInfoDataProps) => {
  return (
    <Flex className="gap-1 self-center md:items-center xl:w-fit">
      <ResearchRankInfoTable {...props}/>
    </Flex>
  );
};
