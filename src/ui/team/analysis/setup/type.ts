import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {MealCoverage} from '@/types/game/cooking';
import {Production} from '@/types/game/producing/rate/base';
import {TeamMemberProduction} from '@/types/game/team';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {TeamCompCalcResult} from '@/ui/team/analysis/calc/type';
import {DeepPartial} from '@/utils/type';


export type TeamAnalysisSetupViewCommonProps = {
  bundleFromClient: DeepPartial<ConfigBundle> | undefined,
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
  currentEnergy: number,
};
