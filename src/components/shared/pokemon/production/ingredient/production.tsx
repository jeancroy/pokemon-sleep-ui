import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {ProductionUI} from '@/components/shared/production/rate/main';
import {IngredientId} from '@/types/game/ingredient';
import {Production} from '@/types/game/producing/rate/base';


type Props = {
  id: IngredientId | undefined,
  rate: Production | null,
  hideStrength?: boolean,
  noLink?: boolean,
};

export const PokemonIngredientProduction = ({id, rate, hideStrength, noLink}: Props) => {
  if (!id || !rate) {
    return (
      <ProductionUI
        rate={null}
        getIcon={(dimension) => <XCircleIcon className={dimension}/>}
      />
    );
  }

  return (
    <ProductionUI
      rate={rate}
      getIcon={(dimension) => (
        <PokemonIngredientIcon id={id} dimension={dimension} noLink={noLink}/>
      )}
      hideStrength={hideStrength}
    />
  );
};
