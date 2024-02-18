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
import {PokemonBerryProduction} from '@/components/shared/pokemon/production/berry';
import {PokemonIngredientProbability} from '@/components/shared/pokemon/production/ingredient/probability';
import {PokemonIngredientProduction} from '@/components/shared/pokemon/production/ingredient/production';
import {PokemonNoSkillProbability} from '@/components/shared/pokemon/production/noSkill/main';
import {PokemonSkillProduction} from '@/components/shared/pokemon/production/skill';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {toProducingRateOfState} from '@/utils/game/producing/convert';
import {formatFloat} from '@/utils/number/format/regular';


export const TeamMemberDetails = (props: TeamMemberProps) => {
  const {
    pokemon,
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
    produceSplit,
    skillRatePercent,
    ingredient,
    carryLimitInfo,
  } = rate;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Sort');

  const berryData = berryDataMap[berry.id];
  const ingredientRates = Object.values(ingredient);

  return (
    <Flex className="gap-1.5 p-1">
      <FlexLink target="_blank" href={`/info/mainskill/${skill}`} center className={clsx(
        'button-clickable-bg group w-full gap-0.5 self-center truncate px-1.5 py-1 text-xs',
        pokemon.specialty === specialtyIdMap.skill && 'text-energy',
      )}>
        <Flex direction="row" className="gap-1 truncate">
          <MainSkillIcon id={skill} dimension="size-4"/>
          <span className="truncate">{t(`MainSkill.Name.${skill}`)}</span>
        </Flex>
        <span>{formatFloat(skillRatePercent)}%</span>
      </FlexLink>
      <HorizontalSplitter/>
      <PokemonFrequencyFromProducingRate pokemonRate={rate}/>
      <HorizontalSplitter/>
      <Flex direction="row" center className="gap-1.5">
        <PokemonTimeToFullPack direction="col" fullPackStats={fullPackStats}/>
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
        <PokemonIngredientProbability alt={t2('IngredientRate')} probabilityRate={produceSplit.ingredient}/>
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
        <PokemonNoSkillProbability rate={rate} sleepSession="primary"/>
        <PokemonNoSkillProbability rate={rate} sleepSession="secondary"/>
      </Flex>
    </Flex>
  );
};
