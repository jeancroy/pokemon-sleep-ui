import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {CalculatedUserSettings} from '@/types/userData/settings/transformed';


export type PokemonDetailedProducingStatsProps = {
  calculatedSettings: CalculatedUserSettings,
  rate: PokemonProducingRate,
  specialty: PokemonSpecialtyId,
};
