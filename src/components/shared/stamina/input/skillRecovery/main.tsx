import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {StaminaConfigSkillRecoveryInput} from '@/components/shared/stamina/input/skillRecovery/input';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {staminaStrategyI18nId} from '@/const/game/stamina';
import {staminaSkillRecoveryStrategies} from '@/types/game/stamina/skill';


export const StaminaConfigSkillRecovery = (props: StaminaConfigProps) => {
  const {config, setConfig, trigger, setTrigger} = props;
  const {skillRecovery} = config;

  const t = useTranslations('UI.Stamina');

  return (
    <Flex center className="gap-1.5">
      <FilterTextInput
        title={
          <Flex direction="row" className="w-10">
            <GenericMainSkillIcon alt={t('Title')} dimension="size-7"/>
          </Flex>
        }
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
