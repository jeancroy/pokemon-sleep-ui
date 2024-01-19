import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingSome} from '@/components/input/filter/utils/check';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {PokedexCalcDataProps} from '@/ui/pokedex/common/calc/type';
import {initialPokedexTierListInputSortDisplay} from '@/ui/pokedex/tier/input/const';
import {PokedexTierListInput, PokedexTierListInputControls} from '@/ui/pokedex/tier/input/type';
import {getPossibleIngredientsFromChain} from '@/utils/game/producing/ingredient/level';


type UsePokedexTierListInputOpts = PokedexCalcDataProps;

export const usePokedexTierListInput = (opts: UsePokedexTierListInputOpts): PokedexTierListInputControls => {
  const {pokemonList, ingredientChainMap} = opts;

  return useFilterInput<PokedexTierListInput, PokemonInfo, PokemonId>({
    data: pokemonList,
    dataToId: ({id}) => id,
    initialFilter: {
      filter: {
        ingredient: {},
        snorlaxFavorite: {},
        sort: initialPokedexTierListInputSortDisplay,
        display: initialPokedexTierListInputSortDisplay,
        ...defaultPokemonIndividualParams,
      },
      showDetails: false,
    },
    isDataIncluded: ({filter}, pokemon) => {
      return isFilterIncludingSome({
        filter,
        filterKey: 'ingredient',
        ids: getPossibleIngredientsFromChain({
          level: filter.level,
          chain: ingredientChainMap[pokemon.ingredientChain],
        }),
      });
    },
  });
};
