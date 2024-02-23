import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';


export type PokemonDetailedProducingStatsProps = {
  calculatedUserConfig: CalculatedUserConfig,
  rate: PokemonProduction,
  specialty: PokemonSpecialtyId,
};
