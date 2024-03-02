import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {MainSkillIcon} from '@/components/shared/icon/mainSkill/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonNoSkillProbability} from '@/components/shared/pokemon/production/noSkill/main';
import {PokemonSkillProduction} from '@/components/shared/pokemon/production/skill';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {toProductionOfState} from '@/utils/game/producing/convert';


export const PokeInBoxTableSkills = ({
  pokeInBox,
  pokemon,
  rateOfPokemon,
}: PokeInBoxTableDetailsProps) => {
  const {
    skill,
    specialty,
  } = pokemon;
  const {
    level,
    nature,
    subSkill,
  } = pokeInBox;

  const t = useTranslations('Game');

  const {subSkillMap} = useCommonServerData();

  return (
    <>
      <Flex direction="row" center noFullWidth className="w-56">
        <PokemonNatureIndicator nature={nature}/>
      </Flex>
      <Flex direction="row" center noFullWidth className="w-36">
        <PokemonSubSkillIndicator level={level} subSkill={subSkill} subSkillMap={subSkillMap}/>
      </Flex>
      <FlexLink direction="row" center href={`/info/mainskill/${skill}`} className={clsx(
        'w-64 gap-1 whitespace-nowrap p-1 text-sm',
        specialty === specialtyIdMap.skill && 'info-highlight',
      )}>
        <MainSkillIcon id={skill} dimension="size-6"/>
        <div>{t(`MainSkill.Name.${skill}`)}</div>
      </FlexLink>
      <Flex center noFullWidth className="w-14">
        <PokemonSkillProduction
          id={skill}
          rate={toProductionOfState({rate: rateOfPokemon.skill, state: 'equivalent'})}
          hideStrength
          normalSize
        />
      </Flex>
      <Flex center noFullWidth className="w-32">
        <PokemonNoSkillProbability
          noSkillTriggerPercent={rateOfPokemon.noSkillTriggerPercent}
          sleepSession="primary"
          normalSize
        />
      </Flex>
      <Flex center noFullWidth className="w-32">
        <PokemonNoSkillProbability
          noSkillTriggerPercent={rateOfPokemon.noSkillTriggerPercent}
          sleepSession="secondary"
          normalSize
        />
      </Flex>
    </>
  );
};
