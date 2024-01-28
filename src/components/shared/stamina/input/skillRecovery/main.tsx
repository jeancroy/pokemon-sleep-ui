import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {staminaConfigSectionStyling} from '@/components/shared/stamina/input/const';
import {StaminaConfigSkillRecoveryInput} from '@/components/shared/stamina/input/skillRecovery/input';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {staminaStrategyI18nId} from '@/const/game/stamina';
import {staminaSkillRecoveryStrategies} from '@/types/game/stamina/skill';


export const StaminaConfigSkillRecovery = ({config, setConfig, trigger, setTrigger}: StaminaConfigProps) => {
  const {skillRecovery} = config;

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
        onClick={(strategy) => setConfig({
          ...config,
          skillRecovery: {
            ...config.skillRecovery,
            strategy,
          },
        })}
        isActive={(strategy) => strategy === skillRecovery.strategy}
        ids={[...staminaSkillRecoveryStrategies]}
        idToText={(strategy) => t(`Strategy.${staminaStrategyI18nId[strategy]}`)}
        noFixedTitleWidth
      />
      <Flex direction="row" className="justify-center gap-1.5">
        <StaminaConfigSkillRecoveryInput
          iconI18nId="Amount"
          iconSrc="/images/mainSkill/target/team.png"
          value={trigger.amount}
          onValueChanged={(amount) => setTrigger({...trigger, amount})}
        />
        <StaminaConfigSkillRecoveryInput
          iconI18nId="DailyCount"
          iconSrc="/images/generic/flash.png"
          value={trigger.dailyCount}
          onValueChanged={(dailyCount) => setTrigger({...trigger, dailyCount})}
        />
      </Flex>
    </Flex>
  );
};
