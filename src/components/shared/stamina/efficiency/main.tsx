import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {StaminaEfficiencyAtState} from '@/components/shared/stamina/efficiency/single';
import {StaminaEfficiency} from '@/types/game/stamina/efficiency';


type Props = {
  efficiency: StaminaEfficiency,
};

export const StaminaEfficiencyUI = ({efficiency}: Props) => {
  const {awake, sleep1, sleep2, average} = efficiency.multiplier;

  return (
    <Flex noFullWidth className="items-end self-end rounded-lg border border-slate-500 px-2 py-1 md:flex-row md:gap-3">
      <StaminaEfficiencyAtState titleI18nId="Awake" value={awake}/>
      <StaminaEfficiencyAtState titleI18nId="Asleep.Primary" value={sleep1}/>
      {!isNaN(sleep2) && <StaminaEfficiencyAtState titleI18nId="Asleep.Secondary" value={sleep2}/>}
      <StaminaEfficiencyAtState titleI18nId="Average" value={average}/>
    </Flex>
  );
};
