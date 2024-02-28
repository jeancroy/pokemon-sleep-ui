import React from 'react';

import {
  TeamCollapsibleOfComp,
  TeamLayoutControl,
  TeamLayoutControlState,
} from '@/components/shared/team/setupControl/layoutControl/type';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {DeepPartial, Nullable} from '@/utils/type';


type UseTeamLayoutControlOpts<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
> = {
  setup: TeamSetup<TKey, TMember, TConfig, TTeam>,
  getLayoutCollapsibleIndexKeys: (team: TTeam) => TKey[],
};

export const useTeamLayoutControl = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
>({
  setup,
  getLayoutCollapsibleIndexKeys,
}: UseTeamLayoutControlOpts<TKey, TMember, TConfig, TTeam>): TeamLayoutControl<TKey> => {
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
          getLayoutCollapsibleIndexKeys(setup.teams[teamUuid]).map((indexKey) => [indexKey, show]),
        ) as TeamCollapsibleOfComp<TKey>,
      ])),
    })),
  };
};
