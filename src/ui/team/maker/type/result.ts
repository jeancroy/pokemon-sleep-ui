import {PokemonProducingRateFinal} from '@/types/game/producing/rate/main';
import {ProduceType} from '@/types/game/producing/type';
import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {TeamMakerBasisValue, TeamMakerIngredientStats, TeamMakerReferenceUnit} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


export type TeamMakerResultComp = {
  rates: PokemonProducingRateFinal<TeamMakerReferenceUnit>,
  strengthByType: {[type in ProduceType]: number},
  basisValue: TeamMakerBasisValue,
  ingredientStats: TeamMakerIngredientStats,
  finalEstimates: SnorlaxRankFinalEstimate[],
};

export type TeamMakerResult = {
  comps: TeamMakerResultComp[],
  inputUsed: TeamMakerInput,
};
