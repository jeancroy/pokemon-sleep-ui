import {ProducingRateSingleParams} from '@/types/game/producing/rate';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';


export type TeamMakerPokeInBoxDataForLimits = {
  pokeInBox: PokeInBox,
  actualLevel: number,
  singleParams: ProducingRateSingleParams,
};

export type TeamMakerGetTeamMakerPokemonLimitsOpts = Omit<TeamMakerCalcInitOpts, 'pokeboxList'> & {
  pokeboxSource: PokeInBox[],
  bundle: ConfigBundle,
  calculatedCookingConfig: CalculatedCookingConfig,
};
