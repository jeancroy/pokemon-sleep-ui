import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating/request';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamMemberData} from '@/types/game/team';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';


type ToRatingRequestOpts = {
  member: TeamMemberData,
  pokemon: PokemonInfo,
  snorlaxFavorite: SnorlaxFavorite,
  specialtyId: PokemonSpecialtyId,
  bundle: ConfigBundle,
};

export const toRatingSetup = ({member, specialtyId, ...opts}: ToRatingRequestOpts): RatingSetupData => ({
  ...member,
  ...opts,
  basis: getDefaultRatingBasis(specialtyId),
  friendshipLevel: 0,
});
