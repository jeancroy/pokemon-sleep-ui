import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {usePokemonSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
import {Pokebox, PokeInBox} from '@/types/userData/pokebox/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {
  getPokemonProducingParams,
  getProducingRateImplicitParamsFromPokeInbox,
  getProducingRateSingleParams,
} from '@/utils/game/producing/params';
import {isNotNullish} from '@/utils/type';


type UseProcessedPokeboxOpts = PokeboxCommonProps & {
  pokebox: Pokebox,
  calculatedConfigBundle: CalculatedConfigBundle,
  pokeInBoxToCalc: PokeInBox[],
  filter: PokeboxViewerFilter,
  isIncluded: FilterInclusionMap<PokeInBox['uuid']>,
  setLoading: (loading: boolean) => void,
};

export const useProcessedPokebox = ({
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
  mealMap,
  eventStrengthMultiplierData,
  cookingRecoveryData,
  recipeLevelData,
  pokebox,
  calculatedConfigBundle,
  pokeInBoxToCalc,
  filter,
  isIncluded,
  setLoading,
}: UseProcessedPokeboxOpts) => usePokemonSortingWorker({
  data: pokeInBoxToCalc
    .filter(({uuid}) => isIncluded[uuid])
    .map((pokeInBox) => {
      const pokemon = pokedexMap[pokeInBox.pokemon];

      if (!pokemon) {
        return null;
      }

      const {level, dateAdded} = pokeInBox;
      const singleParams = getProducingRateSingleParams({
        ...pokeInBox,
        subSkillMap,
      });

      return {
        // Do not directly use `opts` to spread to avoid passing down unwanted props
        pokemon,
        pokemonProducingParams: getPokemonProducingParams({
          pokemonId: pokemon.id,
          pokemonProducingParamsMap,
        }),
        level,
        dateAdded,
        extra: pokeInBox,
        ingredients: getEffectiveIngredientProductions({level, ingredients: pokeInBox.ingredients}),
        calculatedConfigBundle,
        mealMap,
        eventStrengthMultiplierData,
        cookingRecoveryData,
        ...singleParams,
        ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
      } satisfies PokemonInfoWithSortingPayload<PokeInBox>;
    })
    .filter(isNotNullish),
  sort: filter.sort,
  snorlaxFavorite: filter.snorlaxFavorite,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  recipeLevelData,
  // Cannot use `pokeInBoxToCalc` as re-calc dependency here, as it is always a new object after each calculation
  triggerDeps: [pokebox, filter, calculatedConfigBundle],
  setLoading,
});
