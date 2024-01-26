import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {TeamMakerResultCompUi} from '@/ui/team/maker/result/comp';
import {TeamMakerResultCommonProps} from '@/ui/team/maker/result/type';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {TeamMakerResult} from '@/ui/team/maker/type/result';
import {getTeamMakerResultCompId} from '@/ui/team/maker/utils';


type Props = TeamMakerDataProps & Omit<TeamMakerResultCommonProps, 'result'> & {
  result: TeamMakerResult | null,
};

export const TeamMakerResults = ({result, ...props}: Props) => {
  const compsToShow = result?.comps;

  if (!result || !compsToShow || !compsToShow.length) {
    return <UnavailableIcon dimension="size-32" className="self-center"/>;
  }

  return (
    <Flex className="gap-1.5">
      {compsToShow.map((comp) => (
        <TeamMakerResultCompUi key={getTeamMakerResultCompId(comp)} comp={comp} result={result} {...props}/>
      ))}
    </Flex>
  );
};
