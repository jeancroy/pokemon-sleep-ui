import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {TeamSetupControl} from '@/components/shared/team/setupControl/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamMemberProduction} from '@/types/game/team/production';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {PokeInBox} from '@/types/userData/pokebox';
import {Nullable} from '@/utils/type';


export type TeamMemberFilledCommonProps = {
  showPokemon: (pokemon: PokemonInfo) => void,
  bundle: ConfigBundle,
};

export type TeamMemberFilledProps<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = TeamMemberFilledCommonProps & {
  calculatedCookingConfig: CalculatedCookingConfig,
  maxEvolutionCount: number,
  setupControl: TeamSetupControl<TKey, TMember, TConfig, TTeam, TSetup>,
  getRateByLevel: (level: number, memberKey: TKey) => Nullable<TeamMemberProduction>,
};

export type TeamMemberFilledSlotProps<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = TeamMemberFilledProps<TKey, TMember, TConfig, TTeam, TSetup> & {
  collapsible: CollapsibleControl,
  memberKey: TKey,
  member: TeamMemberData,
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  stats: TeamMemberProduction,
};

export type TeamMemberEmptySlotProps<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
> = {
  getMemberFromVanilla: (pokemon: PokemonInfo, memberKey: TKey) => TMember,
  getMemberFromPokeInBox: (pokeInBox: PokeInBox, memberKey: TKey) => TMember,
};

export type TeamMemberEmptySlotPopupType = 'vanilla' | 'pokebox' | 'cloudPull';

export type TeamMemberCloudPullProps<TMember extends Nullable<TeamMemberData>> = {
  getTeamMemberFromCloud: (identifier: string) => Promise<Nullable<TMember>>,
};
