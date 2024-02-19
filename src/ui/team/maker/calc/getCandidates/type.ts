import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


export type GetTeamMakerCandidatesOpts = {
  input: TeamMakerInput,
  pokemonLimits: TeamMakerPokemonLimits[],
  calculatedCookingConfig: CalculatedCookingConfig,
};
