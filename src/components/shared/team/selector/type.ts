import {TeamConfig, TeamMemberData, TeamSetup} from '@/types/game/team';


export type TeamSelectorCommonProps<TTeam extends TeamConfig> = {
  setup: TeamSetup<TTeam>,
  setSetup: (updated: TeamSetup<TTeam>) => void,
  generateNewTeam: (uuid: string) => TTeam,
  getMembers: (team: TTeam) => (TeamMemberData | null)[],
};
