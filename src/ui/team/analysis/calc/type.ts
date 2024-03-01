import {ProductionPeriod} from '@/types/game/producing/display';
import {GroupedProductionByType} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {TeamAnalysisComp, TeamAnalysisSetup, TeamProductionBySlot} from '@/types/website/feature/teamAnalysis';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


export type GetTeamProductionOpts = TeamAnalysisDataProps & {
  setup: TeamAnalysisSetup,
  currentTeam: TeamAnalysisComp,
  bundle: ConfigBundle,
  calculatedCookingConfig: CalculatedCookingConfig,
  overrideLevel?: number,
};

export type GetTeamProductionCommonOpts = {
  period: ProductionPeriod,
  state: ProducingStateCalculated,
};

export type TeamCompCalcResult = {
  bySlot: TeamProductionBySlot,
  grouped: GroupedProductionByType,
};
