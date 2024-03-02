import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProduction, PokemonProductionMetadata} from '@/types/game/producing/rate/main';


export type PokemonDetailedProductionProps = {
  rate: PokemonProduction,
  metadata: PokemonProductionMetadata,
  specialty: PokemonSpecialtyId,
};
