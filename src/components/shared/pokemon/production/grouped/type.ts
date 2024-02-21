import {ProducingRate} from '@/types/game/producing/rate/base';


export type PokemonProductionRateOfCategory = {
  id: number,
  rate: ProducingRate | undefined,
};
