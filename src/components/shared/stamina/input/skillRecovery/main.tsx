import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {staminaConfigSectionStyling} from '@/components/shared/stamina/input/const';
import {StaminaConfigSkillRecoveryInput} from '@/components/shared/stamina/input/skillRecovery/input';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {staminaStrategyI18nId} from '@/const/game/stamina';
import {staminaRecoveryStrategies} from '@/types/game/stamina/strategy';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const StaminaConfigSkillRecovery = ({config, setConfig, setTrigger}: StaminaConfigProps) => {
  const {general, skillRecovery} = config;
  const {amount, dailyCount} = skillRecovery.recovery;

  const t = useTranslations('UI.Stamina');
  const title = t('SkillRecovery.Name');

  return (
    <Flex center className={staminaConfigSectionStyling}>
      <Flex direction="row" className="gap-1">
        <GenericMainSkillIcon alt={title} dimension="size-6" noShrink/>
        <span>{title}</span>
      </Flex>
      <FilterTextInput
        title={null}
        onClick={(strategy) => setConfig(cloneMerge(
          config,
          {general: {strategy}},
        ))}
        isActive={(strategy) => strategy === general.strategy}
        ids={[...staminaRecoveryStrategies]}
        idToText={(strategy) => t(`Strategy.${staminaStrategyI18nId[strategy]}`)}
        noFixedTitleWidth
      />
      <Flex direction="row" className="justify-center gap-1.5">
        <StaminaConfigSkillRecoveryInput
          iconI18nId="Amount"
          iconSrc="/images/mainSkill/target/team.png"
          value={amount}
          onValueChanged={(amount) => setTrigger({...skillRecovery.recovery, amount})}
        />
        <StaminaConfigSkillRecoveryInput
          iconI18nId="DailyCount"
          iconSrc="/images/generic/flash.png"
          value={dailyCount}
          onValueChanged={(dailyCount) => setTrigger({...skillRecovery.recovery, dailyCount})}
        />
      </Flex>
    </Flex>
  );
};
