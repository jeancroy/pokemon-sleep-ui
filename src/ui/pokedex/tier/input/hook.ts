import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/match';
import {enforceFilterWithSkillValue} from '@/components/shared/pokemon/sorter/enforcer/skillValue';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {PokedexCalcDataProps} from '@/ui/pokedex/common/calc/type';
import {initialPokedexTierListInputSortDisplay} from '@/ui/pokedex/tier/input/const';
import {
  PokedexTierListInput,
  PokedexTierListInputControls,
  PokedexTierListInputFilter,
} from '@/ui/pokedex/tier/input/type';
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
        mainSkill: {},
        snorlaxFavorite: {},
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
    onSetFilter: (original, updated) => {
      // If sort becomes non-main skill, force clear out main skills
      if (updated.filter.sort !== 'mainSkillTriggerValue') {
        return {
          ...updated,
          filter: {
            ...original.filter,
            ...updated.filter,
            mainSkill: {},
          },
        };
      }

      // Regular main skill enforcing behavior
      return {
        ...updated,
        filter: enforceFilterWithSkillValue<
          PokedexTierListInputFilter,
          PokedexTierListInputFilter['sort'] | PokedexTierListInputFilter['display']
        >({
          original: original.filter,
          updated: updated.filter,
          config: {
            mainSkill: {
              key: 'mainSkill',
              defaultValue: {[pokemonList[0].skill]: true},
            },
            sort: [
              {key: 'sort', defaultValue: 'totalEnergy'},
              {key: 'display', defaultValue: 'totalEnergy'},
            ],
          },
        }),
      };
    },
  });
};
