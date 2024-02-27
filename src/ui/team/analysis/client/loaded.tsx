import React from 'react';

import {useTeamSetupControl} from '@/components/shared/team/setupControl/hook';
import {TeamAnalysisComp, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {getInitialTeamAnalysisSetup} from '@/ui/team/analysis/client/utils';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {TeamAnalysisSetupViewCommonProps} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/utils/team/setup/getCurrentTeam';


type Props = TeamAnalysisDataProps & TeamAnalysisSetupViewCommonProps;

export const TeamAnalysisLoadedClient = (props: Props) => {
  const {data} = props;

  const initialMigratedSetup = getInitialTeamAnalysisSetup({data});
  const setupControl = useTeamSetupControl({
    initialMigratedSetup,
    getNextKeyForDuplicate: ({members}) => {
      for (const slotName of teamAnalysisSlotName) {
        if (!!members[slotName]) {
          continue;
        }

        return slotName;
      }

      return null;
    },
    getLayoutCollapsibleIndexKeys: () => [...teamAnalysisSlotName],
  });
  const {setup} = setupControl;
  const currentTeam: TeamAnalysisComp = getCurrentTeam({setup});

  return (
    <TeamAnalysisSetupView
      setupControl={setupControl}
      currentTeam={currentTeam}
      {...props}
    />
  );
};
