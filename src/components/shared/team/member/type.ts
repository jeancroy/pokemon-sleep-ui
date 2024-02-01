import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {TeamConfig, TeamMemberData, TeamMemberProduction} from '@/types/game/team';
import {CookingUserSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';


export type TeamMemberDataProps = UsePokemonFilterCommonData & CookingUserSettingsRequiredData & {
  pokedexMap: PokedexMap,
  berryDataMap: BerryDataMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  maxEvolutionCount: number,
};

export type TeamMemberProps = TeamMemberDataProps & {
  config: TeamConfig,
  bundle: UserSettingsBundle,
  member: TeamMemberData,
  memberIdForShare: string,
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  rate: TeamMemberProduction,
  stateOfRate: ProducingStateOfRate,
  showPokemon: (pokemon: PokemonInfo) => void,
  setMember: (update: Partial<TeamMemberData> | null) => void,
  getRate: (level: number) => TeamMemberProduction | null,
};

export type TeamMemberPopupType =
  'memberConfig' |
  'detailedStats' |
  'growthChart' |
  'mealCoverage' |
  'sharableLink';
