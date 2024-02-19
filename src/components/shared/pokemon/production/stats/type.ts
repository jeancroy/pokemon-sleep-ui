import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';


export type PokemonDetailedProducingStatsProps = {
  calculatedSettings: CalculatedUserConfig,
  rate: PokemonProducingRate,
  specialty: PokemonSpecialtyId,
};
