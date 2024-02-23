import {ProductionPeriod} from '@/types/game/producing/display';
import {GroupedProductionByType} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisComp, TeamAnalysisSetup} from '@/types/teamAnalysis';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {TeamProducingStatsBySlot} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


export type GetTeamProductionStatsOpts = TeamAnalysisDataProps & {
  setup: TeamAnalysisSetup,
  currentTeam: TeamAnalysisComp,
  bundle: ConfigBundle,
  calculatedCookingConfig: CalculatedCookingConfig,
  overrideLevel?: number,
};

export type GetTeamProducingStatsCommonOpts = {
  period: ProductionPeriod,
  state: ProducingStateCalculated,
};

export type TeamCompCalcResult = {
  bySlot: TeamProducingStatsBySlot,
  grouped: GroupedProductionByType,
};

export type TeamCompCalcOpts = GetTeamProducingStatsCommonOpts & GetTeamProductionStatsOpts & {
  snorlaxFavorite: SnorlaxFavorite,
};
