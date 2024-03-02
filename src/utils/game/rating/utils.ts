import {specialtyIdToType} from '@/const/game/pokemon';
import {defaultRatingBasisOfSpecialty} from '@/const/game/rating/common';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {ProductionCalcBehavior} from '@/types/game/producing/behavior/type';


export const getDefaultRatingBasis = (specialtyId: PokemonSpecialtyId): RatingBasis => (
  defaultRatingBasisOfSpecialty[specialtyIdToType[specialtyId]]
);

export const getRatingProductionCalcBehavior = (basis: RatingBasis): ProductionCalcBehavior => ({
  asSingle: basis !== 'mainSkillTriggerCount',
});
