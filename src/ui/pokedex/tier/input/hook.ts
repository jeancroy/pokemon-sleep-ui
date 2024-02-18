import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/match';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {defaultSnorlaxFavorite} from '@/const/game/snorlax';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {PokedexCalcDataProps} from '@/ui/pokedex/common/calc/type';
import {initialPokedexTierListInputSortDisplay} from '@/ui/pokedex/tier/input/const';
import {
  PokedexTierListInput,
  PokedexTierListInputControls,
} from '@/ui/pokedex/tier/input/type';
import {getPossibleIngredientsFromChain} from '@/utils/game/ingredient/chain';


type UsePokedexTierListInputOpts = PokedexCalcDataProps;

export const usePokedexTierListInput = (opts: UsePokedexTierListInputOpts): PokedexTierListInputControls => {
  const {pokemonList, ingredientChainMap} = opts;

  return useFilterInput<PokedexTierListInput, PokemonInfo, PokemonId>({
    data: pokemonList,
    dataToId: ({id}) => id,
    initialFilter: {
      filter: {
        ingredient: {},
        mainSkill: {},
        snorlaxFavorite: defaultSnorlaxFavorite,
        sort: initialPokedexTierListInputSortDisplay,
        display: initialPokedexTierListInputSortDisplay,
        ...defaultPokemonIndividualParams,
      },
      showDetails: false,
    },
    isDataIncluded: ({filter}, pokemon) => {
      if (isFilterMismatchOnSingle({
        filter,
        filterKey: 'mainSkill',
        id: pokemon.skill,
      })) {
        return false;
      }

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
