import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {EnergyIcon} from '@/components/shared/icon/energy';
import {PokemonFrequencyFromProduction} from '@/components/shared/pokemon/frequency/fromRate';
import {PokemonCarryLimit} from '@/components/shared/pokemon/inventory/carryLimit/main';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/inventory/fullPack/main';
import {PokemonBerryProduction} from '@/components/shared/pokemon/production/berry';
import {PokemonIndirectSkillProductionUI} from '@/components/shared/pokemon/production/indirectSkill/main';
import {PokemonIngredientProbability} from '@/components/shared/pokemon/production/ingredient/probability';
import {PokemonIngredientProduction} from '@/components/shared/pokemon/production/ingredient/production';
import {PokemonNoSkillProbability} from '@/components/shared/pokemon/production/noSkill/main';
import {PokemonSkillProduction} from '@/components/shared/pokemon/production/skill';
import {ProductionUI} from '@/components/shared/production/rate/main';
import {StaminaEfficiencyUI} from '@/components/shared/stamina/efficiency/main';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {TeamMemberStatsType} from '@/types/game/team';
import {toProductionOfState} from '@/utils/game/producing/convert';


type Props = TeamMemberProps & {
  type: TeamMemberStatsType,
};

export const TeamMemberStats = ({
  pokemon,
  rate,
  berryDataMap,
  stateOfRate,
  type,
}: Props) => {
  const {
    specialty,
    berry,
    skill,
  } = pokemon;
  const {
    params,
    fullPackStats,
    ingredient,
    skillIndirect,
    calculatedUserConfig,
    total,
  } = rate;
  const {
    carryLimitInfo,
    produceSplit,
  } = params;

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('UI.InPage.Pokedex.Sort');

  const berryData = berryDataMap[berry.id];
  const ingredientRates = Object.values(ingredient);

  if (type === 'frequency') {
    return <PokemonFrequencyFromProduction pokemonRate={rate}/>;
  }

  if (type === 'energy') {
    return (
      <Flex direction="row" center className="gap-1.5">
        <EnergyIcon alt={t('Stamina')} dimension="size-7"/>
        <StaminaEfficiencyUI efficiency={calculatedUserConfig.bonus.stamina} mini/>
      </Flex>
    );
  }

  if (type === 'inventory') {
    return (
      <Flex direction="row" center className="gap-1.5">
        <PokemonTimeToFullPack direction="col" fullPackStats={fullPackStats}/>
        <PokemonCarryLimit carryLimit={carryLimitInfo.final} normalTextSize/>
      </Flex>
    );
  }

  if (type === 'berry') {
    return (
      <Flex center className={clsx(specialty === specialtyIdMap.berry && 'text-energy')}>
        <PokemonBerryProduction
          id={berryData.id}
          rate={toProductionOfState({rate: rate.berry, state: stateOfRate})}
        />
      </Flex>
    );
  }

  if (type === 'ingredient') {
    return (
      <Flex center className={clsx(specialty === specialtyIdMap.ingredient && 'text-energy')}>
        <PokemonIngredientProbability alt={t2('IngredientRate')} probabilityRate={produceSplit.ingredient}/>
        {ingredientRates.map((rate) => (
          <PokemonIngredientProduction
            key={rate.id}
            id={rate.id}
            rate={toProductionOfState({rate, state: stateOfRate})}
          />
        ))}
      </Flex>
    );
  }

  if (type === 'skill') {
    return (
      <Flex center className={clsx(specialty === specialtyIdMap.skill && 'text-energy')}>
        <PokemonSkillProduction
          id={skill}
          rate={toProductionOfState({rate: rate.skill, state: stateOfRate})}
        />
        <PokemonIndirectSkillProductionUI rate={skillIndirect}/>
        <PokemonNoSkillProbability noSkillTriggerPercent={rate.noSkillTriggerPercent} sleepSession="primary"/>
        <PokemonNoSkillProbability noSkillTriggerPercent={rate.noSkillTriggerPercent} sleepSession="secondary"/>
      </Flex>
    );
  }

  if (type === 'total') {
    return <ProductionUI rate={total} hideQuantity normalSize className="self-center"/>;
  }

  throw new Error(`Unhandled team member pinned stats type [${type satisfies never}] to show`);
};
