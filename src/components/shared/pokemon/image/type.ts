import {SleepStyleId} from '@/types/game/sleepStyle';


export type PokemonImageTypeOfSleepStyle = {
  type: 'sleepStyle',
  i18nKey: string,
  sleepStyleId: SleepStyleId,
};

export type PokemonImageTypeOfDefault = {
  type: 'default',
  image: 'portrait' | 'icon' | 'happy',
};

export type PokemonImageType = PokemonImageTypeOfSleepStyle | PokemonImageTypeOfDefault;
