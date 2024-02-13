import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Grid} from '@/components/layout/grid';
import {toSortedCalcResult} from '@/components/shared/pokemon/icon/itemStats/base/utils';
import {
  PokemonItemStatsCalcResult,
  PokemonItemStatsCalcResultToDisplay,
} from '@/components/shared/pokemon/icon/itemStats/type';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProducingRate, ProducingRateOfStates} from '@/types/game/producing/rate';


type Props<TResult extends PokemonItemStatsCalcResult> = {
  getItemRate: (pokemonRate: PokemonProducingRate) => ProducingRateOfStates | undefined,
  producingStats: TResult[],
  toItem: (result: PokemonItemStatsCalcResultToDisplay<TResult>) => React.ReactNode,
  isProductionIncluded?: (productions: IngredientProduction[]) => boolean,
  className?: string,
};

export const PokemonItemStatsList = <TResult extends PokemonItemStatsCalcResult>({
  getItemRate,
  producingStats,
  toItem,
  isProductionIncluded,
  className,
}: Props<TResult>) => {
  return (
    <Grid className="grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {toSortedCalcResult({producingStats, getItemRate}).map((result) => (
        <AnimatedCollapse
          key={result.uniqueKey}
          show={isProductionIncluded ? isProductionIncluded(result.ingredients) : true}
          appear
          className={className}
        >
          {toItem(result)}
        </AnimatedCollapse>
      ))}
    </Grid>
  );
};
