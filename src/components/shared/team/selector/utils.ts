import {TeamConfig, TeamSetup} from '@/types/game/team';


type GetUpdatedTeamSetup<TTeam extends TeamConfig> = {
  original: TeamSetup<TTeam>,
  team: TTeam,
};

export const getUpdatedTeamSetup = <TTeam extends TeamConfig>({
  original,
  team,
}: GetUpdatedTeamSetup<TTeam>): TeamSetup<TTeam> => {
  return {
    ...original,
    teams: {
      ...original.teams,
      [team.uuid]: team,
    },
  };
};
