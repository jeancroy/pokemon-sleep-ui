import React from 'react';

import {
  PokemonDetailedProductionTabLayout,
} from '@/components/shared/pokemon/production/stats/tabs/content/common/layout';
import {
  PokemonDetailedProductionCookingExtraTasty,
} from '@/components/shared/pokemon/production/stats/tabs/content/cooking/extraTasty';
import {
  PokemonDetailedProductionCookingIngredientMultiplier,
} from '@/components/shared/pokemon/production/stats/tabs/content/cooking/ingredientMultiplier';
import {PokemonDetailedProductionProps} from '@/components/shared/pokemon/production/stats/type';


export const PokemonDetailedProductionCooking = (props: PokemonDetailedProductionProps) => {
  return (
    <PokemonDetailedProductionTabLayout>
      <PokemonDetailedProductionCookingIngredientMultiplier {...props}/>
      <PokemonDetailedProductionCookingExtraTasty {...props}/>
    </PokemonDetailedProductionTabLayout>
  );
};
