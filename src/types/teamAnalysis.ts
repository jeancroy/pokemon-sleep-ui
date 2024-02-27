import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';


export const teamAnalysisSlotName = ['A', 'B', 'C', 'D', 'E'] as const;

export type TeamAnalysisSlotName = typeof teamAnalysisSlotName[number];

export type TeamAnalysisConfig = TeamSetupConfig;

export type TeamAnalysisMember = TeamMemberData | null;

export type TeamAnalysisComp = TeamData<TeamAnalysisSlotName, TeamAnalysisMember>;

export type TeamAnalysisSetup = TeamSetup<
  TeamAnalysisSlotName,
  TeamAnalysisMember,
  TeamAnalysisConfig,
  TeamAnalysisComp
>;

export type TeamMemberIdData = {
  uuid: string,
  slotName: TeamAnalysisSlotName,
};
