import React from 'react';

import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {ProductionUI} from '@/components/shared/production/rate/main';
import {BerryId} from '@/types/game/berry';
import {Production} from '@/types/game/producing/rate/base';


type Props = {
  id: BerryId,
  rate: Production,
};

export const PokemonBerryProduction = ({id, rate}: Props) => {
  return (
    <ProductionUI
      rate={rate}
      getIcon={(dimension) => <PokemonBerryIcon id={id} dimension={dimension}/>}
    />
  );
};
