import {TeamMemberViewRequiredData} from '@/components/shared/team/memberView/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';
import {Nullable} from '@/utils/type';


export type TeamAnalysisServerDataProps = TeamMemberViewRequiredData & {
  snorlaxData: SnorlaxDataOfMap[],
  preloaded: {
    setup: Nullable<UserTeamAnalysisContent>,
  },
};

export type TeamAnalysisDataProps = TeamAnalysisServerDataProps & {
  pokemonList: PokemonInfo[],
  maxEvolutionCount: number,
};
