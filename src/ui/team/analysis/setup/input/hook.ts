import React from 'react';

import {teamAnalysisSlotName} from '@/types/teamAnalysis';
import {TeamAnalysisSetupInput, TeamAnalysisSetupInputControl} from '@/ui/team/analysis/setup/input/type';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const useTeamAnalysisSetupInput = (): TeamAnalysisSetupInputControl => {
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
      showCollapsible: Object.fromEntries(Object.keys(showCollapsible).map((teamUuid) => [
        teamUuid,
        Object.fromEntries(teamAnalysisSlotName.map((slotName) => [slotName, show])),
      ])),
    })),
  };
};
