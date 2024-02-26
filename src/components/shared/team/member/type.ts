import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {TeamConfig, TeamMemberData, TeamMemberProduction, TeamMemberStatsType} from '@/types/game/team';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type TeamMemberDataProps = UsePokemonFilterCommonData & ConfigRequiredData & {
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
  bundle: ConfigBundle,
  calculatedCookingConfig: CalculatedCookingConfig,
  member: TeamMemberData,
  memberIdForShare: string,
  pinnedStats: TeamMemberStatsType[],
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  rate: TeamMemberProduction,
  stateOfRate: ProducingStateCalculated,
  collapsible: CollapsibleControl,
  showPokemon: (pokemon: PokemonInfo) => void,
  setMember: (update: Partial<TeamMemberData> | null) => void,
  getRateByLevel: (level: number) => TeamMemberProduction | null,
  onDuplicateClick: () => void,
  classOfButton?: string,
};
