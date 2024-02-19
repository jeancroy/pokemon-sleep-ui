import {CalculatedCookingSettings} from '@/types/userData/settings/cooking/calculated';
import {TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


export type GetTeamMakerCandidatesOpts = {
  input: TeamMakerInput,
  pokemonLimits: TeamMakerPokemonLimits[],
  calculatedCookingSettings: CalculatedCookingSettings,
};
