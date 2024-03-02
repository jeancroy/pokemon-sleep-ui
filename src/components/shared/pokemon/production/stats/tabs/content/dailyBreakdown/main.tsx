import React from 'react';

import {useTranslations} from 'next-intl';

import {Grid} from '@/components/layout/grid';
import {
  PokemonDetailedProductionTabLayout,
} from '@/components/shared/pokemon/production/stats/tabs/content/common/layout';
import {
  PokemonDetailedProductionOfState,
} from '@/components/shared/pokemon/production/stats/tabs/content/common/state';
import {PokemonDetailedProductionProps} from '@/components/shared/pokemon/production/stats/type';
import {pokemonProducingStateI18nId} from '@/const/game/production/i18n';


export const PokemonDetailedProductionDailyBreakdown = (props: PokemonDetailedProductionProps) => {
  const t = useTranslations('UI.Producing');

  return (
    <PokemonDetailedProductionTabLayout>
      <Grid className="gap-1 2xl:grid-cols-2">
        <PokemonDetailedProductionOfState
          {...props}
          state="awake"
          title={t(pokemonProducingStateI18nId.awake)}
        />
        <PokemonDetailedProductionOfState
          {...props}
          state="sleep1Vacant"
          title={t(pokemonProducingStateI18nId.sleep1Vacant)}
        />
        <PokemonDetailedProductionOfState
          {...props}
          state="sleep1Filled"
          title={t(pokemonProducingStateI18nId.sleep1Filled)}
        />
        <PokemonDetailedProductionOfState
          {...props}
          state="sleep2Vacant"
          title={t(pokemonProducingStateI18nId.sleep2Vacant)}
        />
        <PokemonDetailedProductionOfState
          {...props}
          state="sleep2Filled"
          title={t(pokemonProducingStateI18nId.sleep2Filled)}
        />
      </Grid>
    </PokemonDetailedProductionTabLayout>
  );
};
