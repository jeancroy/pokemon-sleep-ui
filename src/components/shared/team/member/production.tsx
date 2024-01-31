import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonFrequencyFromProducingRate} from '@/components/shared/pokemon/frequency/fromRate';
import {PokemonCarryLimit} from '@/components/shared/pokemon/inventory/carryLimit/main';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/inventory/fullPack/main';
import {PokemonBerryProduction} from '@/components/shared/pokemon/production/berry';
import {PokemonIngredientProduction} from '@/components/shared/pokemon/production/ingredient';
import {PokemonProbabilityOfNoSkill} from '@/components/shared/pokemon/production/noSkill';
import {PokemonSkillProduction} from '@/components/shared/pokemon/production/skill';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {toProducingRateOfState} from '@/utils/game/producing/convert';


export const TeamMemberProduction = (props: TeamMemberProps) => {
  const {
    pokemon,
    pokemonProducingParams,
    rate,
    berryDataMap,
    stateOfRate,
  } = props;

  const {
    specialty,
    berry,
    skill,
  } = pokemon;
  const {
    fullPackStats,
    ingredient,
    carryLimitInfo,
    total,
  } = rate;

  const berryData = berryDataMap[berry.id];
  const ingredientRates = Object.values(ingredient);

  return (
    <>
      <PokemonFrequencyFromProducingRate pokemonRate={rate}/>
      <Flex direction="row" center className="gap-1.5">
        <PokemonTimeToFullPack direction="col" timeToFullPack={fullPackStats.secondsToFull}/>
        <PokemonCarryLimit carryLimit={carryLimitInfo.final} normalTextSize/>
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <ProducingRateUI rate={total} hideQuantity/>
      <PokemonProductionSplitFromPokemonRate
        rate={rate}
        state={stateOfRate}
        specialty={specialty}
      />
      <HorizontalSplitter className="w-full"/>
      <Flex center className={clsx(specialty === specialtyIdMap.berry && 'info-highlight')}>
        <PokemonBerryProduction
          id={berryData.id}
          rate={toProducingRateOfState({rate: rate.berry, state: stateOfRate})}
        />
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <Flex center className={clsx(specialty === specialtyIdMap.ingredient && 'info-highlight')}>
        {ingredientRates.map((rate) => (
          <PokemonIngredientProduction
            key={rate.id}
            id={rate.id}
            rate={toProducingRateOfState({rate, state: stateOfRate})}
          />
        ))}
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <Flex center className={clsx(specialty === specialtyIdMap.skill && 'info-highlight')}>
        <PokemonSkillProduction
          id={skill}
          rate={toProducingRateOfState({rate: rate.skill, state: stateOfRate})}
        />
        <PokemonProbabilityOfNoSkill
          rate={rate}
          state="sleep1Vacant"
          skillPercent={pokemonProducingParams.skillPercent}
        />
        <PokemonProbabilityOfNoSkill
          rate={rate}
          state="sleep2Vacant"
          skillPercent={pokemonProducingParams.skillPercent}
        />
      </Flex>
    </>
  );
};
