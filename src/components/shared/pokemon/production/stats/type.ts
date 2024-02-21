import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';


export type PokemonDetailedProducingStatsProps = {
  calculatedUserConfig: CalculatedUserConfig,
  rate: PokemonProducingRate,
  specialty: PokemonSpecialtyId,
};
