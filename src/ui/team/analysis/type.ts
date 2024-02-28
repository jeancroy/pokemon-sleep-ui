import {TeamMemberDataProps} from '@/components/shared/team/member/type';
import {TeamMemberViewRequiredData} from '@/components/shared/team/memberView/type';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';
import {Nullable} from '@/utils/type';


export type TeamAnalysisServerDataProps =
  Omit<TeamMemberDataProps, 'maxEvolutionCount'> &
  TeamMemberViewRequiredData & {
    snorlaxData: SnorlaxDataOfMap[],
    fieldMetaMap: FieldMetaMap,
    preloaded: {
      bundle: ConfigBundle,
      setup: Nullable<UserTeamAnalysisContent>,
    },
  };

export type TeamAnalysisDataProps = TeamAnalysisServerDataProps & {
  pokemonList: PokemonInfo[],
  maxEvolutionCount: number,
};
