import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {getNumberStyles} from '@/styles/text/number';
import {PokemonInfo} from '@/types/game/pokemon';
import {SkillTriggerAnalysisCalcUnit} from '@/ui/team/mainskill/targets/type';
import {formatFloat3} from '@/utils/number/format/regular';
import {formatSignedNumber} from '@/utils/number/format/signed';


type Props = {
  pokemon: PokemonInfo,
  unit: SkillTriggerAnalysisCalcUnit,
};

export const SkillTriggerAnalysisResult = ({pokemon, unit}: Props) => {
  const {skillTriggerCount} = unit;
  const {actual, diffPercentToBase} = skillTriggerCount;

  const styleClass = getNumberStyles({num: diffPercentToBase, base: 0});

  return (
    <Flex noFullWidth center>
      <Flex noFullWidth className={clsx('text-2xl', styleClass)}>
        {formatSignedNumber({format: 'float', num: diffPercentToBase})}%
      </Flex>
      <Flex direction="row" noFullWidth className="gap-1">
        <MainSkillIcon id={pokemon.skill}/>
        <span>
          {formatFloat3(actual)}x
        </span>
      </Flex>
    </Flex>
  );
};
