import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {EnergyIcon} from '@/components/shared/icon/energy';
import {staminaStrategyI18nId} from '@/const/game/stamina';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {formatFloat} from '@/utils/number/format/regular';


type Props = {
  config: StaminaCalcConfig,
};

export const StaminaSkillRecoveryBrief = ({config}: Props) => {
  const {general, skillRecovery} = config;
  const {amount, dailyCount} = skillRecovery.recovery;

  const t = useTranslations('UI.Stamina.SkillRecovery');
  const t2 = useTranslations('UI.Stamina.Strategy');

  return (
    <Flex direction="row" className="items-center gap-1">
      <EnergyIcon alt={t('Name')}/>
      <span>{t2(staminaStrategyI18nId[general.strategy])}</span>
      <span>{amount} &times; {formatFloat(dailyCount)}</span>
    </Flex>
  );
};
