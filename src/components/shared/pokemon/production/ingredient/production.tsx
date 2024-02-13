import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {IngredientId} from '@/types/game/ingredient';
import {ProducingRate} from '@/types/game/producing/rate';


type Props = {
  id: IngredientId | undefined,
  rate: ProducingRate | null,
  hideStrength?: boolean,
  noLink?: boolean,
};

export const PokemonIngredientProduction = ({id, rate, hideStrength, noLink}: Props) => {
  if (!id || !rate) {
    return (
      <ProducingRateUI
        rate={null}
        getIcon={(dimension) => <XCircleIcon className={dimension}/>}
      />
    );
  }

  return (
    <ProducingRateUI
      rate={rate}
      getIcon={(dimension) => (
        <PokemonIngredientIcon id={id} dimension={dimension} noLink={noLink}/>
      )}
      hideStrength={hideStrength}
    />
  );
};
