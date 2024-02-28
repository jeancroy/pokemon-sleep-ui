import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {toRatingSetup} from '@/components/shared/team/member/utils';


export type TeamMemberSendRatingRequestOpts = TeamMemberProps & {
  ratingControl: RatingPopupControl,
};

export const teamMemberSendRatingRequest = ({
  teamMetadata,
  bundle,
  member,
  pokemon,
  ratingControl,
}: TeamMemberSendRatingRequestOpts) => {
  ratingControl.sendRequest(toRatingSetup({
    member,
    pokemon,
    snorlaxFavorite: teamMetadata.snorlaxFavorite,
    specialtyId: pokemon.specialty,
    bundle,
  }));
};
