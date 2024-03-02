import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {
  PokemonDetailedProductionTabLayout,
} from '@/components/shared/pokemon/production/stats/tabs/content/common/layout';
import {
  PokemonDetailedProductionOfState,
} from '@/components/shared/pokemon/production/stats/tabs/content/common/state';
import {PokemonDetailedProductionProps} from '@/components/shared/pokemon/production/stats/type';
import {pokemonProducingStateI18nId} from '@/const/game/production/i18n';
import {staminaLevelImageSrc} from '@/const/game/stamina';
import {efficiencyBreakPoints} from '@/types/game/producing/efficiency';
import {getEfficiency} from '@/utils/game/stamina/efficiency';


export const PokemonDetailedProductionAtEnergy = (props: PokemonDetailedProductionProps) => {
  const t = useTranslations('UI.Producing');
  const t2 = useTranslations('UI.Common');

  return (
    <PokemonDetailedProductionTabLayout>
      <Grid className="gap-1 2xl:grid-cols-2">
        {efficiencyBreakPoints.map((breakPoint) => (
          <PokemonDetailedProductionOfState
            {...props}
            key={breakPoint}
            state="base"
            title={
              <Flex direction="row" center className="gap-1.5 p-1">
                <div>{t(pokemonProducingStateI18nId.awake)}</div>
                <div>/</div>
                <GenericIcon
                  src={staminaLevelImageSrc[breakPoint]}
                  alt={`${breakPoint}+`}
                  noInvert
                  dropShadow
                />
                <div>{t2('Stamina')} {breakPoint}+</div>
              </Flex>
            }
            // If no +1 for `getEfficiency()`, the efficiency obtained is actually 1 level lower
            targetMultiplier={getEfficiency({stamina: breakPoint + 1})}
          />
        ))}
      </Grid>
    </PokemonDetailedProductionTabLayout>
  );
};
