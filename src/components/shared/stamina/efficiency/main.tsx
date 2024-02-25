import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {StaminaEfficiencyAtState} from '@/components/shared/stamina/efficiency/single';
import {StaminaEfficiency} from '@/types/game/stamina/efficiency';


type Props = {
  efficiency: StaminaEfficiency,
  mini?: boolean,
};

export const StaminaEfficiencyUI = ({efficiency, mini}: Props) => {
  const {
    awake,
    sleep1,
    sleep2,
    average,
  } = efficiency.multiplier;

  return (
    <Flex noFullWidth className={clsx(
      'items-end',
      !mini && 'self-end rounded-lg border border-slate-500 px-2 py-1 md:flex-row md:gap-3',
      mini && 'w-fit self-center text-sm',
    )}>
      <StaminaEfficiencyAtState state="awake" value={awake} mini={mini}/>
      <StaminaEfficiencyAtState state="sleep1" value={sleep1} mini={mini}/>
      {sleep2 !== null && <StaminaEfficiencyAtState state="sleep2" value={sleep2} mini={mini}/>}
      <StaminaEfficiencyAtState state="average" value={average} mini={mini}/>
    </Flex>
  );
};
