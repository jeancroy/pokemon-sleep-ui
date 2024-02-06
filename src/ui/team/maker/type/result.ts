import {ProduceType} from '@/types/game/producing/common';
import {PokemonProducingRateFinal} from '@/types/game/producing/rate';
import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamMakerBasisValue, TeamMakerIngredientStats, TeamMakerReferenceUnit} from '@/ui/team/maker/type/common';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';


export type TeamMakerResultComp = {
  rates: PokemonProducingRateFinal<TeamMakerReferenceUnit>,
  strengthByType: {[type in ProduceType]: number},
  basisValue: TeamMakerBasisValue,
  ingredientStats: TeamMakerIngredientStats,
  finalEstimates: SnorlaxRankFinalEstimate[],
};

export type TeamMakerResult = {
  comps: TeamMakerResultComp[],
  basis: TeamMakerBasis,
  snorlaxFavorite: SnorlaxFavorite,
};
