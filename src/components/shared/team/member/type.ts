import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {TeamMemberData} from '@/types/game/team/member';
import {TeamMemberProduction} from '@/types/game/team/production';
import {TeamMetadata} from '@/types/game/team/team';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {Nullable} from '@/utils/type';


export type TeamMemberDataProps = {
  maxEvolutionCount: number,
};

export type TeamMemberProps = TeamMemberDataProps & {
  teamMetadata: TeamMetadata,
  bundle: ConfigBundle,
  calculatedCookingConfig: CalculatedCookingConfig,
  member: TeamMemberData,
  memberIdForShare: string,
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  production: TeamMemberProduction,
  stateOfRate: ProducingStateCalculated,
  collapsible: CollapsibleControl,
  showPokemon: (pokemon: PokemonInfo) => void,
  setMember: (update: Partial<TeamMemberData> | null) => void,
  getProductionByLevel: (level: number) => Nullable<TeamMemberProduction>,
  onDuplicateClick: () => void,
  classOfButton?: string,
};
