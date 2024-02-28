import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexCalcDataProps} from '@/ui/pokedex/common/calc/type';


export type PokedexTierListDataProps = PokedexCalcDataProps & {
  fieldMetaMap: FieldMetaMap,
  pokemonMaxLevel: number,
};
