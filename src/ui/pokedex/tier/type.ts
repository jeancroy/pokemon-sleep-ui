import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexCalcDataProps} from '@/ui/pokedex/common/calc/type';


export type PokedexTierListDataProps = PokedexCalcDataProps & {
  mapMeta: FieldMetaMap,
  pokemonMaxLevel: number,
};
