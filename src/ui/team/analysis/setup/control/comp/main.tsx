import React from 'react';

import {TeamSelector} from '@/components/shared/team/selector/main';
import {SessionStatus} from '@/types/session';
import {TeamAnalysisSetupControl} from '@/ui/team/analysis/setup/control/setup/type';
import {generateEmptyTeam} from '@/ui/team/analysis/utils';


type Props = {
  setupControl: TeamAnalysisSetupControl,
  sessionStatus: SessionStatus,
};

export const TeamAnalysisCompControl = ({setupControl, sessionStatus}: Props) => {
  const {setup, setSetup} = setupControl;
  const {config} = setup;

  return (
    <TeamSelector
      setup={{
        current: config.current,
        teams: setup.comps,
      }}
      setSetup={({current, teams}) => setSetup(({config}) => ({
        config: {
          ...config,
          current,
        },
        comps: teams,
      }))}
      status={sessionStatus}
      getMembers={({members}) => Object.values(members)}
      generateNewTeam={(uuid) => generateEmptyTeam(uuid)}
    />
  );
};
