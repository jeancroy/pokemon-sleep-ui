import {PokemonSpecialtyId} from '@/types/game/pokemon';


export type PokemonProductionSplitCommonProps = {
  specialty: PokemonSpecialtyId | null,
  showSummary?: boolean,
  classBarHeight?: `h-${number}`,
  className?: string,
};
