import React from 'react';

import {
  PokemonDetailedProductionTabLayout,
} from '@/components/shared/pokemon/production/stats/tabs/content/common/layout';
import {PokemonDetailedProductionProps} from '@/components/shared/pokemon/production/stats/type';
import {StaminaChartOfStamina} from '@/components/shared/stamina/chart/stamina';
import {StaminaEfficiencyUI} from '@/components/shared/stamina/efficiency/main';
import {getStaminaEventLogsFlattened} from '@/utils/game/stamina/flatten';


export const PokemonDetailedProductionEnergyCurve = ({calculatedUserConfig}: PokemonDetailedProductionProps) => {
  return (
    <PokemonDetailedProductionTabLayout>
      <StaminaEfficiencyUI efficiency={calculatedUserConfig.bonus.stamina}/>
      <StaminaChartOfStamina
        config={calculatedUserConfig.origin.stamina}
        logs={getStaminaEventLogsFlattened(calculatedUserConfig.bonus.stamina.logs)}
      />
    </PokemonDetailedProductionTabLayout>
  );
};
