import {PokemonInfo} from '@/types/game/pokemon';
import {SleepStyleNormal, SleepStyleSpecial} from '@/types/game/sleepStyle';


export type PokemonGalleryCommonProps = {
  pokemon: PokemonInfo,
  sleepStyles: SleepStyleNormal[],
  sleepStylesSpecial: SleepStyleSpecial[],
};
