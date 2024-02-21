import {PokemonProducingRate} from '@/types/game/producing/rate/main';


export type PokeInBoxProductionRateCalcState = {
  loading: boolean,
  rate: PokemonProducingRate | null,
};
