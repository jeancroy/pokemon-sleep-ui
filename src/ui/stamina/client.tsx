'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {StaminaChartOfEfficiency} from '@/components/shared/stamina/chart/efficiency';
import {StaminaChartOfStamina} from '@/components/shared/stamina/chart/stamina';
import {StaminaEfficiencyUI} from '@/components/shared/stamina/efficiency/main';
import {StaminaConfig} from '@/components/shared/stamina/input/main';
import {useConfigBundle} from '@/hooks/userData/config/bundle/main';
import {useStaminaAnalysis} from '@/ui/stamina/hook';
import {StaminaAnalysisDataProps} from '@/ui/stamina/type';
import {getStaminaEventLogsFlattened} from '@/utils/game/stamina/flatten';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export const StaminaAnalysisClient = (props: StaminaAnalysisDataProps) => {
  const {subSkillMap, cookingRecoveryData, preloaded} = props;

  const {data} = useSession();
  const bundle = useConfigBundle({
    bundle: {
      server: preloaded.bundle,
      client: data?.user.preloaded,
    },
  });

  const {state, setConfig, setSkillTrigger, setNature, setSubSkill} = useStaminaAnalysis(props);
  const {config, subSkill, nature} = state;

  const staminaEfficiency = getStaminaEfficiency({
    config,
    cookingRecoveryData,
  });
  const logs = getStaminaEventLogsFlattened(staminaEfficiency.logs);

  return (
    <Flex className="gap-1.5 p-2">
      <StaminaConfig
        bundle={bundle}
        config={config}
        setConfig={setConfig}
        setTrigger={setSkillTrigger}
        {...props}
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
