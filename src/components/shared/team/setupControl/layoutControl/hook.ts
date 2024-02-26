import React from 'react';

import {
  TeamCollapsibleOfComp,
  TeamLayoutControl,
  TeamLayoutControlState,
} from '@/components/shared/team/setupControl/layoutControl/type';
import {TeamConfig, TeamSetup} from '@/types/game/team';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {DeepPartial, Indexable} from '@/utils/type';


type UseTeamLayoutControlOpts<TTeam extends TeamConfig, TKey extends Indexable> = {
  setup: TeamSetup<TTeam>,
  getCollapsibleIndexKeys: (team: TTeam) => TKey[],
};

export const useTeamLayoutControl = <TTeam extends TeamConfig, TKey extends Indexable>({
  setup,
  getCollapsibleIndexKeys,
}: UseTeamLayoutControlOpts<TTeam, TKey>): TeamLayoutControl<TKey> => {
  const [input, setInput] = React.useState<TeamLayoutControlState<TKey>>({
    collapsible: {},
  });
  const {collapsible} = input;

  return {
    generateCollapsibleControl: (teamUuid, key) => {
      const compCollapsible = collapsible[teamUuid];

      return {
        show: !!(compCollapsible && compCollapsible[key]),
        setShow: (show) => setInput((original) => cloneMerge(
          original,
          {collapsible: {[teamUuid]: {[key]: show} as DeepPartial<TeamCollapsibleOfComp<TKey>>}},
        )),
      };
    },
    setAllCollapsible: (show) => setInput(({collapsible, ...original}) => ({
      ...original,
      // Taking `setup.teams` to ensure all teams are included for collapsible control
      collapsible: Object.fromEntries(Object.keys(setup.teams).map((teamUuid) => [
        teamUuid,
        // CANNOT source from `collapsible[teamUuid]` for comp collapsible
        // because it is an empty object on init even if the team already has some members
        Object.fromEntries(
          getCollapsibleIndexKeys(setup.teams[teamUuid]).map((indexKey) => [indexKey, show]),
        ) as TeamCollapsibleOfComp<TKey>,
      ])),
    })),
  };
};
