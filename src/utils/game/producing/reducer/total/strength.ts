import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/reducer/total/common';


export const getTotalStrengthOfPokemonProducingRate = (rate: PokemonProducingRate): number => {
  return getTotalOfPokemonProducingRate({rate, state: 'equivalent'}).strength;
};
