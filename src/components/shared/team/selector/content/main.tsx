import React from 'react';

import {Grid} from '@/components/layout/grid';
import {TeamCreateButton} from '@/components/shared/team/selector/content/create';
import {TeamSelectButton} from '@/components/shared/team/selector/content/select';
import {TeamSelectorContentCommonProps} from '@/components/shared/team/selector/content/type';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {Nullable} from '@/utils/type';


export const TeamSelectorContent = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>(props: TeamSelectorContentCommonProps<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {setupControl} = props;
  const {setup} = setupControl;

  return (
    <Grid className="grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3">
      {Object.values(setup.teams).map((team) => <TeamSelectButton key={team.uuid} team={team} {...props}/>)}
      <TeamCreateButton {...props}/>
    </Grid>
  );
};
