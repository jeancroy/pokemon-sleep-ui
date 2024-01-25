import {PokemonInfoWithSortingPayload, PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {TranslatedUserSettings} from '@/types/userData/settings';
import {PokedexCalcDataProps} from '@/ui/pokedex/common/calc/type';
import {PokedexDisplayType, PokedexFilterCommon} from '@/ui/pokedex/common/type';
import {getPossibleIngredientsFromChain} from '@/utils/game/ingredientChain';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProducingParams, getProducingRateIndividualParams} from '@/utils/game/producing/params';


const exhaustIngredientCombinationsIfSort: PokemonSortType[] = [
  'ingredientCount',
  'ingredientEnergy',
  'frequency',
  'frequencyOfIngredient',
  'timeToFullPackPrimary',
  'timeToFullPackSecondary',
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

type ToPokemonInfoWithSortingPayloadFromPokemonListOpts<
  TFilter extends PokedexFilterCommon,
> = PokedexCalcDataProps & {
  filter: TFilter,
  translatedSettings: TranslatedUserSettings,
};

export const toPokemonInfoWithSortingPayloadFromPokemonList = <TFilter extends PokedexFilterCommon>({
  pokemonList,
  pokemonProducingParamsMap,
  subSkillMap,
  ingredientChainMap,
  translatedSettings,
  filter,
}: ToPokemonInfoWithSortingPayloadFromPokemonListOpts<TFilter>) => pokemonList.flatMap((
  pokemon,
): PokemonInfoWithSortingPayload<null>[] => {
  const commonOpts: Omit<PokemonInfoWithSortingPayload<null>, 'ingredients'> = {
    pokemon,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: pokemon.id,
      pokemonProducingParamsMap,
    }),
    dateAdded: null,
    extra: null,
    ...translatedSettings,
    ...getProducingRateIndividualParams({
      input: filter,
      pokemon,
      subSkillMap,
    }),
  };
  const chain = ingredientChainMap[pokemon.ingredientChain];

  if (!toCalculateAllIngredientPossibilities(filter)) {
    return [{
      ...commonOpts,
      // Count of 0 to avoid accidental inclusion in the calculation
      ingredients: getPossibleIngredientsFromChain({chain, count: 0}),
    }];
  }

  return [...generatePossibleIngredientProductions({
    level: filter.level,
    chain,
  })]
    .map((ingredients) => ({...commonOpts, ingredients}));
});
