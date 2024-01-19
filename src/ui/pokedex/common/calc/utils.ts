import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {PokedexFilterCommon} from '@/ui/pokedex/common/type';
import {PokedexDisplayType} from '@/ui/pokedex/index/input/type';


const exhaustIngredientCombinationsIfSort: PokemonSortType[] = [
  'ingredientCount',
  'ingredientEnergy',
  'frequency',
  'frequencyOfIngredient',
  'timeToFullPack',
  'totalEnergy',
  // Time to full pack indirectly affects how many skills could proc
  'mainSkillTriggerValue',
];

const exhaustIngredientCombinationsIfDisplay: PokedexDisplayType[] = [
  ...exhaustIngredientCombinationsIfSort,
  'ingredient',
];

export const toCalculateAllIngredientPossibilities = <TFilter extends PokedexFilterCommon>({
  display,
  sort,
}: TFilter): boolean => {
  return (
    exhaustIngredientCombinationsIfSort.includes(sort) ||
    exhaustIngredientCombinationsIfDisplay.includes(display)
  );
};
