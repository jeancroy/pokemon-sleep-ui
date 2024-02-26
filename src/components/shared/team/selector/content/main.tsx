import React from 'react';

import {Grid} from '@/components/layout/grid';
import {TeamCreateButton} from '@/components/shared/team/selector/content/create';
import {TeamSelectButton} from '@/components/shared/team/selector/content/select';
import {TeamSelectorContentCommonProps} from '@/components/shared/team/selector/content/type';
import {TeamConfig} from '@/types/game/team';


export const TeamSelectorContent = <TTeam extends TeamConfig>(props: TeamSelectorContentCommonProps<TTeam>) => {
  const {setup} = props;

  return (
    <Grid className="grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3">
      {Object.values(setup.teams).map((team) => <TeamSelectButton key={team.uuid} team={team} {...props}/>)}
      <TeamCreateButton {...props}/>
    </Grid>
  );
};
