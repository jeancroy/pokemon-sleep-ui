import {PokemonSpecialtyId} from '@/types/game/pokemon';


export type PokemonProductionSplitCommonProps = {
  specialty: PokemonSpecialtyId | null,
  classBarHeight?: `h-${number}`,
  className?: string,
};
