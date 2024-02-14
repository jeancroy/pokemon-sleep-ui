import React from 'react';

import {getInitialTeamAnalysisSetup} from '@/ui/team/analysis/client/utils';
import {useTeamAnalysisSetupControl} from '@/ui/team/analysis/setup/control/setup/hook';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {TeamAnalysisSetupViewCommonProps} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';


type Props = TeamAnalysisDataProps & TeamAnalysisSetupViewCommonProps;

export const TeamAnalysisLoadedClient = (props: Props) => {
  const {data} = props;

  const initialSetup = getInitialTeamAnalysisSetup({data});
  const setupControl = useTeamAnalysisSetupControl({initialSetup});
  const {setup} = setupControl;
  const currentTeam = getCurrentTeam({setup});

  return (
    <TeamAnalysisSetupView
      setupControl={setupControl}
      currentTeam={currentTeam}
      {...props}
    />
  );
};
