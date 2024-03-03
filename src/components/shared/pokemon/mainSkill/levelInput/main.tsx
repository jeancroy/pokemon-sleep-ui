import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {PokemonMainSkillLevelText} from '@/components/shared/pokemon/mainSkill/text';
import {textFilterButtonStyle} from '@/styles/input';
import {MainSkillLevel} from '@/types/game/pokemon/mainSkill';
import {generateNumberTicks} from '@/utils/number/generator';


type Props = {
  maxSkillLevel: number,
  current: MainSkillLevel,
  onSelected: (skillLevel: MainSkillLevel) => void,
};

export const PokemonMainSkillLevelInput = ({maxSkillLevel, current, onSelected}: Props) => {
  const t = useTranslations('UI.Pokemon.Stats.MainSkill');

  return (
    <FilterExpandedInput
      title={t('Level')}
      ids={[
        ...generateNumberTicks({max: maxSkillLevel, interval: 1, start: 1}),
        'max',
        'base',
      ] satisfies MainSkillLevel[]}
      idToButton={(level) => (
        <div className="mx-1">
          <PokemonMainSkillLevelText level={level}/>
        </div>
      )}
      onClick={onSelected}
      isActive={(level) => current == level}
      className={clsx(textFilterButtonStyle, 'text-sm')}
    />
  );
};
