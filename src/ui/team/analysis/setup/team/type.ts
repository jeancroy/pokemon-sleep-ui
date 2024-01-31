import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamMemberData, TeamMemberProduction} from '@/types/game/team';
import {TeamAnalysisComp, TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {CookingUserSettings, UserSettingsBundle} from '@/types/userData/settings';
import {TeamAnalysisSetupModifyingProps} from '@/ui/team/analysis/type';


export type TeamAnalysisFilledProps = TeamAnalysisSetupModifyingProps & {
  showPokemon: (pokemon: PokemonInfo) => void,
  currentTeam: TeamAnalysisComp,
  bundle: UserSettingsBundle,
  cookingSettings: CookingUserSettings,
};

export type TeamAnalysisFilledSlotProps = TeamAnalysisFilledProps & {
  snorlaxFavorite: SnorlaxFavorite,
  slotName: TeamAnalysisSlotName,
  member: TeamMemberData,
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  stats: TeamMemberProduction,
};

export type TeamAnalysisEmptySlotPopupType = 'vanilla' | 'pokebox' | 'cloudPull';
