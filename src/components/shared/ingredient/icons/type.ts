import {FlexDirection} from '@/components/layout/flex/type';
import {IngredientIconCommonProps} from '@/components/shared/pokemon/ingredients/type';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';


export type IngredientIconMark = 'green' | 'red' | 'gray';

export type IngredientIconsCommonProps = IngredientIconCommonProps & {
  useTextShadow?: boolean,
  getMark?: (ingredient: PokemonProducingItem<IngredientId>) => IngredientIconMark | false | null,
  direction?: FlexDirection,
  showTotalCount?: boolean,
  showXMarkOnEmpty?: boolean,
  formatQty?: (qty: number) => string,
  noQuantity?: boolean,
  wrapItem?: boolean,
  wrapAll?: boolean,
  classOfGap?: `gap-${string}`,
  classOfText?: `text-${string}`,
  classOfItem?: string,
  className?: string,
};
