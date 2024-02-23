import {PokemonProduction} from '@/types/game/producing/rate/main';


export type PokeInBoxProductionRateCalcState = {
  loading: boolean,
  rate: PokemonProduction | null,
};
