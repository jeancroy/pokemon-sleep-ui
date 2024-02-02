import {PokemonProducingRate} from '@/types/game/producing/rate';


export type PokeInBoxProductionRateCalcState = {
  loading: boolean,
  rate: PokemonProducingRate | null,
};
