import {ItemPack} from '@/types/game/item';
import {PokedexMap} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


export type ItemMetaCommonProps = {
  pokedexMap: PokedexMap,
  itemPack: ItemPack,
  dimension?: Dimension,
};
