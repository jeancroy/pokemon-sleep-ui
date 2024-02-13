import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {SleepdexMap} from '@/types/game/sleepdex';
import {TeamMemberData} from '@/types/game/team';
import {ActivationInfo} from '@/types/mongo/activation';
import {UserDataLoadingOpts} from '@/types/userData/load';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';


export type UserLazyLoadedContent = {
  // Keys has to match `UserDataLoadingOpts['type']`
  teamAnalysis: UserTeamAnalysisContent,
  teamAnalysisMember: TeamMemberData,
  pokeboxSingle: PokeInBox | null,
  pokeboxSorted: PokeInBox[],
  pokeboxWithFilter: PokeInBox[],
  sleepdex: SleepdexMap,
  sleepdexOfPokemon: SleepdexMap,
  ratingConfig: RatingConfig,
  adminActivationCreate: string,
  adminActivationCheck: ActivationInfo | null,
  buildId: string,
};

// @ts-ignore: For checking if `UserLazyLoadedContent` implements every possible `UserDataLoadingOpts['type']` only
// noinspection JSUnusedLocalSymbols
type _ = UserLazyLoadedContent[UserDataLoadingOpts['type']];
