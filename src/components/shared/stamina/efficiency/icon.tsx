import React from 'react';

import SunIcon from '@heroicons/react/24/outline/SunIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {EnergyIcon} from '@/components/shared/icon/energy';
import {SleepIcon} from '@/components/shared/icon/sleep';
import {staminaEfficiencyStateI18nId} from '@/const/game/stamina';
import {StaminaEfficiencyState} from '@/types/game/stamina/efficiency';
import {Dimension} from '@/types/style';


type Props = {
  state: StaminaEfficiencyState,
  dimension: Dimension,
};

export const StaminaEfficiencyStateIcon = ({state, dimension}: Props) => {
  const t = useTranslations('UI.Stamina.State');
  const text = t(staminaEfficiencyStateI18nId[state]);

  if (state === 'average') {
    return <EnergyIcon alt={text} dimension={dimension}/>;
  }

  if (state === 'awake') {
    return <SunIcon title={text} className={dimension}/>;
  }

  if (state === 'sleep1') {
    return (
      <Flex direction="row" noFullWidth center>
        <SleepIcon alt={text} dimension={dimension}/>
        <span>1</span>
      </Flex>
    );
  }

  if (state === 'sleep2') {
    return (
      <Flex direction="row" noFullWidth center>
        <SleepIcon alt={text} dimension={dimension}/>
        <span>1</span>
      </Flex>
    );
  }

  throw new Error(`Unhandled stamina efficiency state [${state satisfies never}] for rendering icon`);
};
