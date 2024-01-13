import {CookingUserSettings} from '@/types/userData/settings';
import {TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


export type GetTeamMakerCandidatesOpts = {
  input: TeamMakerInput,
  pokemonLimits: TeamMakerPokemonLimits[],
  cookingSettings: CookingUserSettings,
};
