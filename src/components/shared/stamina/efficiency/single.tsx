import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {StaminaEfficiencyStateIcon} from '@/components/shared/stamina/efficiency/icon';
import {staminaEfficiencyStateI18nId} from '@/const/game/stamina';
import {StaminaEfficiencyState} from '@/types/game/stamina/efficiency';


type Props = {
  state: StaminaEfficiencyState,
  value: number | null,
  mini?: boolean,
};

export const StaminaEfficiencyAtState = ({state, value, mini}: Props) => {
  const t = useTranslations('UI.Stamina.State');

  return (
    <Flex direction="row" noFullWidth className={clsx(
      'gap-1',
      mini ? 'items-center' : 'items-end',
    )}>
      {mini ?
        <StaminaEfficiencyStateIcon state={state} dimension="size-4"/> :
        <span className="text-xs">{t(staminaEfficiencyStateI18nId[state])}</span>}
      <div>{value ? value.toFixed(4) : NaN}x</div>
    </Flex>
  );
};
