import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {PokemonDetailedProducingStatsOfState} from '@/components/shared/pokemon/production/stats/state';
import {PokemonDetailedProducingStatsProps} from '@/components/shared/pokemon/production/stats/type';
import {StaminaChartOfStamina} from '@/components/shared/stamina/chart/stamina';
import {StaminaEfficiencyUI} from '@/components/shared/stamina/efficiency/main';
import {pokemonProducingStateI18nId} from '@/const/game/production/i18n';
import {staminaLevelImageSrc} from '@/const/game/stamina';
import {efficiencyBreakPoints} from '@/types/game/producing/efficiency';
import {getEfficiency} from '@/utils/game/stamina/efficiency';
import {getStaminaEventLogsFlattened} from '@/utils/game/stamina/flatten';


export const PokemonDetailedProducingStats = (props: PokemonDetailedProducingStatsProps) => {
  const {calculatedSettings} = props;

  const t = useTranslations('UI.Producing');
  const t2 = useTranslations('UI.Common');

  return (
    <Flex className="gap-1 sm:w-[80vw]">
      <AdsUnit/>
      <PokemonDetailedProducingStatsOfState
        {...props}
        state="equivalent"
        title={t(pokemonProducingStateI18nId.equivalent)}
      />
      <AdsUnit/>
      <Grid className="gap-1 2xl:grid-cols-2">
        <PokemonDetailedProducingStatsOfState
          {...props}
          state="awake"
          title={t(pokemonProducingStateI18nId.awake)}
        />
        <PokemonDetailedProducingStatsOfState
          {...props}
          state="sleep1Vacant"
          title={t(pokemonProducingStateI18nId.sleep1Vacant)}
        />
        <PokemonDetailedProducingStatsOfState
          {...props}
          state="sleep1Filled"
          title={t(pokemonProducingStateI18nId.sleep1Filled)}
        />
        <PokemonDetailedProducingStatsOfState
          {...props}
          state="sleep2Vacant"
          title={t(pokemonProducingStateI18nId.sleep2Vacant)}
        />
        <PokemonDetailedProducingStatsOfState
          {...props}
          state="sleep2Filled"
          title={t(pokemonProducingStateI18nId.sleep2Filled)}
        />
      </Grid>
      <AdsUnit/>
      <StaminaEfficiencyUI efficiency={calculatedSettings.bonus.stamina}/>
      <StaminaChartOfStamina
        config={calculatedSettings.origin.stamina}
        logs={getStaminaEventLogsFlattened(calculatedSettings.bonus.stamina.logs)}
      />
      {/* If no +1 for `getEfficiency()`, the efficiency obtained is actually 1 level lower */}
      <Grid className="gap-1 2xl:grid-cols-2">
        {efficiencyBreakPoints.map((breakPoint) => (
          <PokemonDetailedProducingStatsOfState
            {...props}
            key={breakPoint}
            state="equivalent"
            title={
              <Flex direction="row" center className="gap-1.5 p-1">
                <div>{t(pokemonProducingStateI18nId.awake)}</div>
                <div>/</div>
                <GenericIcon
                  src={staminaLevelImageSrc[breakPoint]}
                  alt={`${breakPoint}+`}
                  noInvert
                  dropShadow
                />
                <div>{t2('Stamina')} {breakPoint}+</div>
              </Flex>
            }
            targetMultiplier={getEfficiency({stamina: breakPoint + 1})}
          />
        ))}
      </Grid>
      <AdsUnit/>
    </Flex>
  );
};
