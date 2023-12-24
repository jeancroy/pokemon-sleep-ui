import {SleepdexMap} from '@/types/game/sleepdex';
import {ActivationInfo} from '@/types/mongo/activation';
import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';


export type UserLazyLoadedContent = {
  // Keys has to match `UserDataLoadingOpts['type']`
  teamAnalysis: UserTeamAnalysisContent,
  teamAnalysisMember: TeamAnalysisMember,
  pokeboxSingle: PokeInBox,
  pokeboxSorted: PokeInBox[],
  pokeboxWithFilter: PokeInBox[],
  sleepdex: SleepdexMap,
  sleepdexOfPokemon: SleepdexMap,
  adminActivationCreate: string,
  adminActivationCheck: ActivationInfo | null,
  buildId: string,
};
