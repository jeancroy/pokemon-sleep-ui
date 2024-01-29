'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {StaminaChartOfEfficiency} from '@/components/shared/stamina/chart/efficiency';
import {StaminaChartOfStamina} from '@/components/shared/stamina/chart/stamina';
import {StaminaEfficiencyUI} from '@/components/shared/stamina/efficiency/main';
import {StaminaConfig} from '@/components/shared/stamina/input/main';
import {useStaminaAnalysis} from '@/ui/stamina/hook';
import {StaminaAnalysisDataProps} from '@/ui/stamina/type';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEventLogsFlattened} from '@/utils/game/stamina/flatten';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export const StaminaAnalysisClient = (props: StaminaAnalysisDataProps) => {
  const {subSkillMap, cookingRecoveryData} = props;

  const {state, setConfig, setSkillTrigger, setNature, setSubSkill} = useStaminaAnalysis(props);
  const {config, skillTrigger, subSkill, nature} = state;
  const {sleepSession, recoveryRate} = config;

  const staminaEfficiency = getStaminaEfficiency({
    config,
    sessionInfo: getSleepSessionInfo({
      session: sleepSession,
      recoveryRate,
    }),
    cookingRecoveryData,
    skillTriggers: [skillTrigger],
  });
  const logs = getStaminaEventLogsFlattened(staminaEfficiency.logs);

  return (
    <Flex className="gap-1.5 p-2">
      <StaminaConfig
        cookingRecoveryData={cookingRecoveryData}
        config={config}
        setConfig={setConfig}
        trigger={skillTrigger}
        setTrigger={setSkillTrigger}
      />
      <Flex className="gap-1.5 md:flex-row">
        <PokemonSubSkillSelector
          classNameForHeight="h-8"
          subSkill={subSkill}
          setSubSkill={setSubSkill}
          subSkillMap={subSkillMap}
        />
        <PokemonNatureSelector
          classNameForHeight="h-8"
          nature={nature}
          setNature={setNature}
        />
      </Flex>
      <AdsUnit hideIfNotBlocked/>
      <StaminaEfficiencyUI efficiency={staminaEfficiency}/>
      <StaminaChartOfStamina config={config} logs={logs}/>
      <AdsUnit hideIfNotBlocked/>
      <StaminaChartOfEfficiency config={config} logs={logs}/>
    </Flex>
  );
};
