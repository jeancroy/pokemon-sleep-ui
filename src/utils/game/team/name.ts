import {TeamMetadata} from '@/types/game/team/team';


export const getDefaultTeamName = (teamUuid: string): string => {
  return teamUuid.substring(0, 8);
};

export const getTeamName = (team: TeamMetadata): string => {
  return team.name || getDefaultTeamName(team.uuid);
};
