import React from 'react';

import {Grid} from '@/components/layout/grid';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonIngredientProduction} from '@/types/game/pokemon';
import {useMealContentCoverageItemData} from '@/ui/meal/page/content/coverage/calc/hook';
import {MealContentCoverageItem} from '@/ui/meal/page/content/coverage/item';
import {MealContentCoverageCommonProps} from '@/ui/meal/page/content/coverage/type';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {isNotNullish} from '@/utils/type';


export const MealContentCoverageList = ({ingredientLevel, ...props}: MealContentCoverageCommonProps) => {
  const {pokedex, meal, ingredientChainMap} = props;

  const {state, setState, showPokemon} = usePokemonLinkPopup();

  // Memoization is needed to prevent `usePokemonProducingStats()` keeps re-calculating
  const pokemonIngredientProduction = React.useMemo(
    () => toPokemonList(pokedex)
      .map(({id, ingredientChain}): PokemonIngredientProduction | null => {
        const chain = ingredientChainMap[ingredientChain];
        const ingredientIncludedInMeal = chain.ingredients[ingredientLevel]
          .some(({id}) => meal.ingredients.some((ingredient) => ingredient.id === id));

        if (!ingredientIncludedInMeal) {
          return null;
        }

        return {
          pokemonId: id,
          ingredientChainId: ingredientChain,
        };
      })
      .filter(isNotNullish),
    [pokedex],
  );
  const data = useMealContentCoverageItemData({
    pokemonIngredientProduction,
    ...props,
  });

  return (
    <Grid className="info-section grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <PokemonLinkPopup state={state} setState={setState}/>
      {data.map((entry) => (
        <MealContentCoverageItem key={entry.calcResult.uniqueKey} entry={entry} showPokemon={showPokemon}/>
      ))}
    </Grid>
  );
};
