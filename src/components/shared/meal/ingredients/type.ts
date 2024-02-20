import {IngredientId} from '@/types/game/ingredient';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';


export type IngredientIconMark = 'green' | 'red';

export type IngredientIconsCommonProps = {
  useTextShadow?: boolean,
  getMark?: (ingredient: PokemonProducingItem<IngredientId>) => IngredientIconMark | false | null,
  className?: string,
};
