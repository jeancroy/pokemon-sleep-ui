import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIngredientStats} from '@/components/shared/pokemon/icon/itemStats/ingredient';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {MealIngredient} from '@/types/game/meal/main';
import {PokemonIngredientProductionMapOfLevel} from '@/types/game/pokemon';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {MealCommonProps} from '@/ui/meal/page/type';


type Props = MealCommonProps & {
  ingredient: MealIngredient,
  input: PokemonIndividualParams,
  ingredientProductionMapOfLevel: PokemonIngredientProductionMapOfLevel,
};

export const MealContentIngredientSection = ({
  input,
  calculatedConfigBundle,
  ingredient,
  ingredientProductionMapOfLevel,
}: Props) => {
  const {id, quantity} = ingredient;

  const serverData = useCommonServerData();
  const {ingredientMap} = serverData;
  const collapsible = useCollapsibleControl();

  return (
    <CollapsibleFull control={collapsible} button={
      <Flex center direction="row" className="gap-1 text-xl">
        <PokemonIngredientIcon id={id} dimension="size-8" noLink/>
        <div>{quantity}</div>
      </Flex>
    }>
      <PokemonIngredientStats
        input={input}
        ingredient={ingredientMap[id]}
        pokemonIngredientProduction={ingredientProductionMapOfLevel[id] ?? []}
        hidePokebox
        calculatedConfigBundle={calculatedConfigBundle}
        {...serverData}
      />
      <AdsUnit/>
    </CollapsibleFull>
  );
};
