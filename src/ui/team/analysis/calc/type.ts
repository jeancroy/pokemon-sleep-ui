import {ProductionPeriod} from '@/types/game/producing/display';
import {GroupedProductionByType} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {CommonServerDataCollection} from '@/types/website/data/common';
import {TeamAnalysisComp, TeamAnalysisSetup, TeamProductionBySlot} from '@/types/website/feature/teamAnalysis';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


export type GetTeamProductionOpts = TeamAnalysisDataProps & Pick<
  CommonServerDataCollection,
  'ingredientMap' |
  'ingredientChainMap' |
  'mealMap' |
  'cookingRecoveryData' |
  'pokedexMap' |
  'pokemonProducingParamsMap' |
  'berryDataMap' |
  'mainSkillMap' |
  'fieldMetaMap' |
  'potInfoList' |
  'recipeLevelData' |
  'eventStrengthMultiplierData' |
  'subSkillMap'
> & {
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
