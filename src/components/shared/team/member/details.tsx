import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonFrequencyFromProducingRate} from '@/components/shared/pokemon/frequency/fromRate';
import {PokemonCarryLimit} from '@/components/shared/pokemon/inventory/carryLimit/main';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/inventory/fullPack/main';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {PokemonNameSimple} from '@/components/shared/pokemon/name/simple';
import {PokemonBerryProduction} from '@/components/shared/pokemon/production/berry';
import {PokemonIngredientProduction} from '@/components/shared/pokemon/production/ingredient';
import {PokemonProbabilityOfNoSkill} from '@/components/shared/pokemon/production/noSkill';
import {PokemonSkillProduction} from '@/components/shared/pokemon/production/skill';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {toProducingRateOfState} from '@/utils/game/producing/convert';


export const TeamMemberDetails = (props: TeamMemberProps) => {
  const {
    member,
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
  } = rate;

  const t = useTranslations('Game');

  const berryData = berryDataMap[berry.id];
  const ingredientRates = Object.values(ingredient);

  return (
    <Flex className="gap-1.5 p-1">
      <PokemonNameSimple pokemon={pokemon} override={member.name}/>
      <Flex direction="row" className={clsx(
        'items-center justify-center truncate text-sm',
        pokemon.specialty === specialtyIdMap.skill && 'text-energy',
      )}>
        <FlexLink center target="_blank" href={`/info/mainskill/${skill}`} className="button-clickable group p-1">
          <MainSkillIcon id={skill} dimension="size-5"/>
        </FlexLink>
        <span className="truncate">{t(`MainSkill.Name.${skill}`)}</span>
      </Flex>
      <HorizontalSplitter/>
      <PokemonFrequencyFromProducingRate pokemonRate={rate}/>
      <HorizontalSplitter/>
      <Flex direction="row" center className="gap-1.5">
        <PokemonTimeToFullPack direction="col" timeToFullPack={fullPackStats.secondsToFull}/>
        <PokemonCarryLimit carryLimit={carryLimitInfo.final} normalTextSize/>
      </Flex>
      <HorizontalSplitter/>
      <Flex center className={clsx(specialty === specialtyIdMap.berry && 'text-energy')}>
        <PokemonBerryProduction
          id={berryData.id}
          rate={toProducingRateOfState({rate: rate.berry, state: stateOfRate})}
        />
      </Flex>
      <HorizontalSplitter/>
      <Flex center className={clsx(specialty === specialtyIdMap.ingredient && 'text-energy')}>
        {ingredientRates.map((rate) => (
          <PokemonIngredientProduction
            key={rate.id}
            id={rate.id}
            rate={toProducingRateOfState({rate, state: stateOfRate})}
          />
        ))}
      </Flex>
      <HorizontalSplitter/>
      <Flex center className={clsx(specialty === specialtyIdMap.skill && 'text-energy')}>
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
    </Flex>
  );
};
