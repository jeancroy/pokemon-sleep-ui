import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {TeamMemberData} from '@/types/game/team/member';
import {TeamMemberProduction} from '@/types/game/team/production';
import {TeamMetadata} from '@/types/game/team/team';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {Nullable} from '@/utils/type';


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
  teamMetadata: TeamMetadata,
  bundle: ConfigBundle,
  calculatedCookingConfig: CalculatedCookingConfig,
  member: TeamMemberData,
  memberIdForShare: string,
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  rate: TeamMemberProduction,
  stateOfRate: ProducingStateCalculated,
  collapsible: CollapsibleControl,
  showPokemon: (pokemon: PokemonInfo) => void,
  setMember: (update: Partial<TeamMemberData> | null) => void,
  getRateByLevel: (level: number) => Nullable<TeamMemberProduction>,
  onDuplicateClick: () => void,
  classOfButton?: string,
};
