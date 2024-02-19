import {ProducingRateSingleParams} from '@/types/game/producing/rate';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {CalculatedCookingSettings} from '@/types/userData/settings/cooking';
import {UserSettingsBundle} from '@/types/userData/settings/main';
import {TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';


export type TeamMakerPokeInBoxDataForLimits = {
  pokeInBox: PokeInBox,
  actualLevel: number,
  singleParams: ProducingRateSingleParams,
};

export type TeamMakerGetTeamMakerPokemonLimitsOpts = Omit<TeamMakerCalcInitOpts, 'pokeboxList'> & {
  pokeboxSource: PokeInBox[],
  bundle: UserSettingsBundle,
  calculatedCookingSettings: CalculatedCookingSettings,
};
