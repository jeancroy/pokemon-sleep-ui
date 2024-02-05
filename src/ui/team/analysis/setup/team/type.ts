import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {TeamMemberData, TeamMemberProduction} from '@/types/game/team';
import {TeamAnalysisComp, TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {CookingUserSettings} from '@/types/userData/settings/cooking';
import {UserSettingsBundle} from '@/types/userData/settings/main';
import {TeamAnalysisSetupModifyingProps} from '@/ui/team/analysis/type';


export type TeamAnalysisFilledProps = TeamAnalysisSetupModifyingProps & {
  showPokemon: (pokemon: PokemonInfo) => void,
  currentTeam: TeamAnalysisComp,
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

export type TeamAnalysisSetMemberOpts = {
  slotName: TeamAnalysisSlotName,
  member: TeamMemberData | null,
};

export type TeamAnalysisEmptySlotPopupType = 'vanilla' | 'pokebox' | 'cloudPull';
