import {TeamMemberDataProps} from '@/components/shared/team/member/type';
import {TeamMemberViewRequiredData} from '@/components/shared/team/memberView/type';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {UserLazyLoadedData} from '@/types/userData/main';


export type TeamAnalysisServerDataProps =
  Omit<TeamMemberDataProps, 'maxEvolutionCount'> &
  TeamMemberViewRequiredData & {
    snorlaxData: SnorlaxDataOfMap[],
    mapMeta: FieldMetaMap,
    preloaded: ConfigBundle,
  };

export type TeamAnalysisDataProps = TeamAnalysisServerDataProps & {
  data: UserLazyLoadedData['teamAnalysis'],
  pokemonList: PokemonInfo[],
  maxEvolutionCount: number,
};
