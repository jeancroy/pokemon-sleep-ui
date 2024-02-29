import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';

import {Flex} from '@/components/layout/flex/common';
import {MainSkillTargetIcon} from '@/components/shared/icon/mainSkill/target';
import {MainSkillEffectTypeIcon} from '@/components/shared/icon/mainSkill/type';
import {MainSkillEffectValue} from '@/components/shared/pokemon/mainSkill/effect/value';
import {MainSkillEffectAtLevel} from '@/types/game/pokemon/mainSkill';


type Props = {
  effect: MainSkillEffectAtLevel,
};

export const MainSkillEffectUI = ({effect}: Props) => {
  if (effect.type === 'strength' || effect.type === 'shards') {
    if (effect.range) {
      return (
        <Flex direction="row" className="items-center">
          <MainSkillEffectValue type={effect.type} value={effect.range.from}/>
          <div>~</div>
          <MainSkillEffectValue type={effect.type} value={effect.range.to}/>
        </Flex>
      );
    }

    return <MainSkillEffectValue type={effect.type} value={effect.value}/>;
  }

  if (effect.type === 'stamina') {
    return (
      <Flex direction="row" noFullWidth className="items-center gap-1">
        <MainSkillTargetIcon target={effect.target}/>
        <div>{effect.value}</div>
      </Flex>
    );
  }

  if (effect.type === 'help') {
    return <MainSkillEffectValue type={effect.type} value={effect.count}/>;
  }

  if (effect.type === 'cooking') {
    return (
      <MainSkillEffectValue
        type={effect.type}
        value={effect.ingredients || effect.capacity || effect.successPercent}
      />
    );
  }

  if (effect.type === 'random') {
    return <MainSkillEffectTypeIcon type={effect.type}/>;
  }

  if (effect.type === 'unknown') {
    return <QuestionMarkCircleIcon className="size-6"/>;
  }

  console.error(`Unhandled main skill effect type [${effect.type satisfies never}]`);
};
