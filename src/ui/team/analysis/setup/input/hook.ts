import React from 'react';

import {TeamAnalysisSetup, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {TeamAnalysisSetupInput, TeamAnalysisSetupInputControl} from '@/ui/team/analysis/setup/input/type';
import {cloneMerge} from '@/utils/object/cloneMerge';


type UseTeamAnalysisSetupInputOpts = {
  setup: TeamAnalysisSetup,
};

export const useTeamAnalysisSetupInput = ({setup}: UseTeamAnalysisSetupInputOpts): TeamAnalysisSetupInputControl => {
  const [input, setInput] = React.useState<TeamAnalysisSetupInput>({
    showCollapsible: {},
  });
  const {showCollapsible} = input;

  return {
    generateSlotCollapsibleControl: (teamUuid, slotName) => {
      const compCollapsible = showCollapsible[teamUuid];

      return {
        show: !!(compCollapsible && compCollapsible[slotName]),
        setShow: (show) => setInput((original) => cloneMerge(
          original,
          {showCollapsible: {[teamUuid]: {[slotName]: show}}},
        )),
      };
    },
    setAllCollapsible: (show) => setInput(({showCollapsible, ...original}) => ({
      ...original,
      // Taking `setup.comps` to ensure all team comps are included for collapsible control
      // `showCollapsible` is initialized using empty object, so `Object.keys(showCollapsible)` could be empty
      showCollapsible: Object.fromEntries(Object.keys(setup.comps).map((teamUuid) => [
        teamUuid,
        Object.fromEntries(teamAnalysisSlotName.map((slotName) => [slotName, show])),
      ])),
    })),
  };
};
