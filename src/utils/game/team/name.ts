import {TeamConfig} from '@/types/game/team';


export const getDefaultTeamName = (teamUuid: string): string => {
  return teamUuid.substring(0, 8);
};

export const getTeamName = (team: TeamConfig): string => {
  return team.name || getDefaultTeamName(team.uuid);
};
