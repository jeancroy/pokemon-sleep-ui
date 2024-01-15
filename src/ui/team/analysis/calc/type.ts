import {ProductionPeriod} from '@/types/game/producing/display';
import {PokemonProducingRateByType} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisComp, TeamAnalysisSetup} from '@/types/teamAnalysis';
import {CookingUserSettings, UserSettingsBundle} from '@/types/userData/settings';
import {TeamProducingStatsBySlot} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


export type GetTeamProducingStatsOpts = TeamAnalysisDataProps & {
  setup: TeamAnalysisSetup,
  bundle: UserSettingsBundle,
  currentTeam: TeamAnalysisComp,
  cookingSettings: CookingUserSettings,
  overrideLevel?: number,
};

export type GetTeamProducingStatsCommonOpts = {
  period: ProductionPeriod,
  state: ProducingStateOfRate,
};

export type TeamCompCalcResult = {
  bySlot: TeamProducingStatsBySlot,
  grouped: PokemonProducingRateByType,
};

export type TeamCompCalcOpts = GetTeamProducingStatsCommonOpts & GetTeamProducingStatsOpts & {
  snorlaxFavorite: SnorlaxFavorite,
};
