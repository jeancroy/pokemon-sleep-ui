import {useSession} from 'next-auth/react';

import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {MealCoverage} from '@/types/game/cooking';
import {Production} from '@/types/game/producing/rate/base';
import {TeamMemberProduction} from '@/types/game/team/production';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {TeamCompCalcResult} from '@/ui/team/analysis/calc/type';


export type TeamAnalysisSetupViewCommonProps = {
  session: ReturnType<typeof useSession>,
  actorReturn: UseUserDataActorReturn,
};

export type TeamProducingStatsTotal = {
  berry: Production,
  ingredient: Production | null,
  skill: Production,
};

export type TeamProducingStatsBySlot = {[slot in TeamAnalysisSlotName]: TeamMemberProduction | null};

export type TeamProducingStats = TeamCompCalcResult & {
  total: TeamProducingStatsTotal,
  overall: Production,
  mealCoverage: MealCoverage,
};

export type TeamFinalEstimateInput = {
  endsAt: string,
  currentStrength: number,
};
