import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {TeamMemberData, TeamMemberProduction} from '@/types/game/team';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {CookingUserSettings} from '@/types/userData/settings/cooking';
import {UserSettingsBundle} from '@/types/userData/settings/main';
import {TeamAnalysisSetupUpdateCommonProps} from '@/ui/team/analysis/setup/control/setup/common/type';


export type TeamAnalysisFilledProps = TeamAnalysisSetupUpdateCommonProps & {
  showPokemon: (pokemon: PokemonInfo) => void,
  bundle: UserSettingsBundle,
  cookingSettings: CookingUserSettings,
};

export type TeamAnalysisFilledSlotProps = TeamAnalysisFilledProps & {
  collapsible: CollapsibleControl,
  slotName: TeamAnalysisSlotName,
  member: TeamMemberData,
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  stats: TeamMemberProduction,
};

export type TeamAnalysisEmptySlotPopupType = 'vanilla' | 'pokebox' | 'cloudPull';
