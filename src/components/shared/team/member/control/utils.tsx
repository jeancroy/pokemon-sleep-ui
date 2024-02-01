import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {toRatingSetup} from '@/components/shared/team/member/utils';


export type TeamMemberSendRatingRequestOpts = TeamMemberProps & {
  ratingControl: RatingPopupControl,
};

export const teamMemberSendRatingRequest = ({
  config,
  bundle,
  member,
  pokemon,
  ratingControl,
}: TeamMemberSendRatingRequestOpts) => {
  ratingControl.sendRequest(toRatingSetup({
    member,
    pokemon,
    snorlaxFavorite: config.snorlaxFavorite,
    specialtyId: pokemon.specialty,
    bundle,
  }));
};
