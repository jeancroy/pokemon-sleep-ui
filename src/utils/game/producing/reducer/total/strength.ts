import {PokemonProduction} from '@/types/game/producing/rate/main';
import {getTotalPokemonProduction} from '@/utils/game/producing/reducer/total/common';


export const getTotalStrengthOfPokemonProduction = (rate: PokemonProduction): number => {
  return getTotalPokemonProduction({rate, state: 'equivalent'}).strength;
};
