import {EventInfo} from '@/types/game/event/info';
import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {SleepdexMap} from '@/types/game/sleepdex';
import {TeamMemberData} from '@/types/game/team/member';
import {ActivationInfo} from '@/types/mongo/activation';
import {ProductionComparisonTarget} from '@/types/productionComparison';
import {UserDataLoadingOpts} from '@/types/userData/load';
import {PokeInBox} from '@/types/userData/pokebox';


export type UserLazyLoadedContent = {
  // Keys has to match `UserDataLoadingOpts['type']`
  teamAnalysisMember: TeamMemberData,
  productionComparisonTarget: ProductionComparisonTarget,
  pokeboxSingle: PokeInBox | null,
  pokeboxSorted: PokeInBox[],
  pokeboxWithFilter: PokeInBox[],
  sleepdex: SleepdexMap,
  sleepdexOfPokemon: SleepdexMap,
  ratingConfig: RatingConfig,
  adminActivationCreate: string,
  adminActivationCheck: ActivationInfo | null,
  eventList: EventInfo[],
  buildId: string,
};

// For checking if `UserLazyLoadedContent` implements every possible `UserDataLoadingOpts['type']` only
// > Have to have `export` here, otherwise TS compilation will fail
export type _ = UserLazyLoadedContent[UserDataLoadingOpts['type']];
