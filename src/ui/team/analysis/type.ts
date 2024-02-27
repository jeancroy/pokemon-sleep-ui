import {TeamMemberDataProps} from '@/components/shared/team/member/type';
import {TeamMemberViewDataProps} from '@/components/shared/team/memberView/type';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {UserLazyLoadedData} from '@/types/userData/main';


export type TeamAnalysisServerDataProps = Omit<
  TeamMemberDataProps & TeamMemberViewDataProps,
  'maxEvolutionCount'
> & {
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  snorlaxData: SnorlaxDataOfMap[],
  mapMeta: FieldMetaMap,
  preloaded: ConfigBundle,
};

export type TeamAnalysisDataProps = TeamAnalysisServerDataProps & {
  data: UserLazyLoadedData['teamAnalysis'],
  pokemonList: PokemonInfo[],
  maxEvolutionCount: number,
};
