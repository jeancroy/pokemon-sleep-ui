import {PokemonGender} from '@/types/game/pokemon/gender';


export const genderTextStyle: {[gender in PokemonGender]: string} = {
  male: 'text-blue-600 dark:text-blue-400',
  female: 'text-rose-600 dark:text-rose-400',
  unknown: 'text-purple-600 dark:text-purple-400',
};
