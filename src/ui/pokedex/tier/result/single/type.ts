import {PokedexCalcResultEntry} from '@/ui/pokedex/common/calc/type';
import {PokedexTierListInput} from '@/ui/pokedex/tier/input/type';
import {PokedexTier} from '@/ui/pokedex/tier/result/type';


export type PokedexTierListSingleCommonProps = {
  input: PokedexTierListInput,
  tier: PokedexTier,
  bucket: PokedexCalcResultEntry[],
  sizePercentage: number,
};
