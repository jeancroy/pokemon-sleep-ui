import React from 'react';

import {UserSettingsBundle} from '@/types/userData/settings/main';
import {getInitialTeamAnalysisSetup} from '@/ui/team/analysis/client/utils';
import {useTeamAnalysisSetupControl} from '@/ui/team/analysis/setup/control/setup/hook';
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
