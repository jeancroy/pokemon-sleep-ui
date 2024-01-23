import {PokemonGender} from '@/types/game/pokemon/gender';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const genderEvolutionTextI18nId: {
  [gender in PokemonGender]: I18nMessageKeysOfNamespace<'UI.Evolution.Gender'>
} = {
  male: 'Male',
  female: 'Female',
  unknown: 'Unknown',
};
