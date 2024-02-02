import React from 'react';

import {Grid} from '@/components/layout/grid';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {PokemonProductionCombinationItem} from '@/ui/pokedex/page/production/combination/item';
import {PokemonProductionCombinationCommonProps} from '@/ui/pokedex/page/production/combination/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';


type Props = PokemonProductionCombinationCommonProps & {
  chain: IngredientChain,
};

export const PokemonProductionCombination = ({chain, ...props}: Props) => {
  const {input} = props;
  const {level} = input;

  return (
    <Grid className="grid-cols-1 gap-1 xl:grid-cols-2">
      {[...generatePossibleIngredientProductions({level, chain})].map((ingredients) => (
        <PokemonProductionCombinationItem
          key={ingredients.map(({id}) => id).join('-')}
          ingredients={ingredients}
          {...props}
        />
      ))}
    </Grid>
  );
};
