import React from 'react';

import {TeamAnalysisSetup} from '@/types/teamAnalysis';
import {UserSettingsBundle} from '@/types/userData/settings';
import {getInitialTeamAnalysisSetup} from '@/ui/team/analysis/client/utils';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {DeepPartial} from '@/utils/type';


type Props = TeamAnalysisDataProps & {
  bundleFromClient: DeepPartial<UserSettingsBundle> | undefined,
};

export const TeamAnalysisLoadedClient = (props: Props) => {
  const {data} = props;

  const initialSetup = getInitialTeamAnalysisSetup({data});
  const [setup, setSetup] = React.useState<TeamAnalysisSetup>(initialSetup);
  const currentTeam = getCurrentTeam({setup});

  return (
    <TeamAnalysisSetupView
      setup={setup}
      setSetup={setSetup}
      currentTeam={currentTeam}
      {...props}
    />
  );
};
