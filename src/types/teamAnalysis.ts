import {TeamConfig, TeamMemberData} from '@/types/game/team';
import {Migratable} from '@/types/migrate';


export const teamAnalysisSlotName = ['A', 'B', 'C', 'D', 'E'] as const;

export type TeamAnalysisSlotName = typeof teamAnalysisSlotName[number];

export type TeamAnalysisConfig = Migratable & {
  current: string,
};

export type TeamAnalysisCompMembers = {[slot in TeamAnalysisSlotName]: TeamMemberData | null};

export type TeamAnalysisComp = Migratable & TeamConfig & {
  members: TeamAnalysisCompMembers,
};

export type TeamAnalysisSetup = {
  config: TeamAnalysisConfig,
  comps: {[uuid in string]: TeamAnalysisComp},
};

export type TeamMemberIdData = {
  uuid: string,
  slotName: TeamAnalysisSlotName,
};
