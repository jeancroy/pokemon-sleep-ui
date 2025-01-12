import {PokemonInfoWithSortingPayload, PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
import {PokedexCalcDataProps} from '@/ui/pokedex/common/calc/type';
import {PokedexDisplayType, PokedexFilterCommon} from '@/ui/pokedex/common/type';
import {getPossibleIngredientsFromChain} from '@/utils/game/ingredient/chain';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProducingParams, getProductionIndividualParams} from '@/utils/game/producing/params';


const exhaustIngredientCombinationsIfSort: PokemonSortType[] = [
  'ingredientCount',
  'ingredientEnergy',
  'frequency',
  'frequencyOfIngredient',
  'timeToFullPackPrimary',
  'timeToFullPackSecondary',
  'totalEnergy',
  'mealCoverage',
  // Ingredient combination affects TTFP, TTFP affects expected skill count
  'mainSkillDailyCount',
  'mainSkillDailyStrength',
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

type ToPokemonInfoWithSortingPayloadFromPokemonListOpts<
  TFilter extends PokedexFilterCommon,
> = PokedexCalcDataProps & {
  filter: TFilter,
  calculatedConfigBundle: CalculatedConfigBundle,
};

export const toPokemonInfoWithSortingPayloadFromPokemonList = <TFilter extends PokedexFilterCommon>({
  pokemonList,
  pokemonProducingParamsMap,
  subSkillMap,
  ingredientChainMap,
  calculatedConfigBundle,
  filter,
  ...opts
}: ToPokemonInfoWithSortingPayloadFromPokemonListOpts<TFilter>) => pokemonList.flatMap((
  pokemon,
): PokemonInfoWithSortingPayload<null>[] => {
  const commonOpts: Omit<PokemonInfoWithSortingPayload<null>, 'ingredients'> = {
    ...opts,
    pokemon,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: pokemon.id,
      pokemonProducingParamsMap,
    }),
    individual: getProductionIndividualParams({
      input: filter,
      pokemon,
      subSkillMap,
      override: {mainSkillLevel: filter.mainSkillLevel},
    }),
    dateAdded: null,
    extra: null,
    calculatedConfigBundle,
  };
  const chain = ingredientChainMap[pokemon.ingredientChain];

  if (!toCalculateAllIngredientPossibilities(filter)) {
    return [{
      ...commonOpts,
      // Qty of 0 to avoid accidental inclusion in the calculation
      ingredients: getPossibleIngredientsFromChain({level: null, chain})
        .map((id) => ({id, qty: 0})),
    }];
  }

  return [...generatePossibleIngredientProductions({
    level: filter.level,
    chain,
  })]
    .map((ingredients) => ({...commonOpts, ingredients}));
});
