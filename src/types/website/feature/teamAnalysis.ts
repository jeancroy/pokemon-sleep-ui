import {MealCoverage} from '@/types/game/cooking/meal';
import {Production} from '@/types/game/producing/rate/base';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData} from '@/types/game/team/member';
import {TeamMemberProduction} from '@/types/game/team/production';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {TeamCompCalcResult} from '@/ui/team/analysis/calc/type';


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

export type TeamProductionTotal = {
  berry: Production,
  ingredient: Production | null,
  skill: Production,
};

export type TeamProductionBySlot = {[slot in TeamAnalysisSlotName]: TeamMemberProduction | null};

export type TeamProduction = TeamCompCalcResult & {
  total: TeamProductionTotal,
  overall: Production,
  mealCoverage: MealCoverage,
};
