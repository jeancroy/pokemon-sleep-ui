import React from 'react';

import {
  PokemonDetailedProductionTabLayout,
} from '@/components/shared/pokemon/production/stats/tabs/content/common/layout';
import {PokemonDetailedProductionProps} from '@/components/shared/pokemon/production/stats/type';
import {StaminaChartOfStamina} from '@/components/shared/stamina/chart/stamina';
import {StaminaEfficiencyUI} from '@/components/shared/stamina/efficiency/main';
import {StaminaLogsUI} from '@/components/shared/stamina/log/main';
import {getStaminaEventLogsFlattened} from '@/utils/game/stamina/flatten';


export const PokemonDetailedProductionEnergyCurve = ({metadata}: PokemonDetailedProductionProps) => {
  const {calculatedUserConfig} = metadata;
  const {bonus, origin} = calculatedUserConfig;

  return (
    <PokemonDetailedProductionTabLayout>
      <StaminaEfficiencyUI efficiency={bonus.stamina}/>
      <StaminaChartOfStamina config={origin.stamina} logs={getStaminaEventLogsFlattened(bonus.stamina.logs)}/>
      <StaminaLogsUI logs={bonus.stamina.logs} timingOffset={origin.stamina.sleepSession.primary.end}/>
    </PokemonDetailedProductionTabLayout>
  );
};
