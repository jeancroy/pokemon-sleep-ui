import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {TeamConfig, TeamMemberData, TeamMemberProduction} from '@/types/game/team';
import {CookingUserSettingsRequiredData} from '@/types/userData/settings/cooking';
import {UserSettingsBundle} from '@/types/userData/settings/main';


export type TeamMemberDataProps = UsePokemonFilterCommonData & CookingUserSettingsRequiredData & {
  pokedexMap: PokedexMap,
  berryDataMap: BerryDataMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  recipeLevelData: RecipeLevelData[],
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
  collapsible: CollapsibleControl,
  showPokemon: (pokemon: PokemonInfo) => void,
  setMember: (update: Partial<TeamMemberData> | null) => void,
  getRate: (level: number) => TeamMemberProduction | null,
  classOfButton?: string,
};

