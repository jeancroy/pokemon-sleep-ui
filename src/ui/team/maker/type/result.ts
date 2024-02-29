import {PokemonProductionFinal, PokemonProductionTotal} from '@/types/game/producing/rate/main';
import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {TeamMakerBasisValue, TeamMakerIngredientStats, TeamMakerReferenceUnit} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


export type TeamMakerResultComp = {
  rates: PokemonProductionFinal<TeamMakerReferenceUnit>,
  strengthByType: PokemonProductionTotal,
  basisValue: TeamMakerBasisValue,
  ingredientStats: TeamMakerIngredientStats,
  finalEstimates: SnorlaxRankFinalEstimate[],
};

export type TeamMakerResult = {
  comps: TeamMakerResultComp[],
  inputUsed: TeamMakerInput,
  bundleUsed: ConfigBundle,
};
