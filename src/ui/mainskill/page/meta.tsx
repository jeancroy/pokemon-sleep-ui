import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {MainSkillIcon} from '@/components/shared/icon/mainSkill/main';
import {MainSkillEffectTypeIcon} from '@/components/shared/icon/mainSkill/type';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';
import {toUnique} from '@/utils/array';


type Props = {
  data: MainSkillData,
};

export const MainSkillMeta = ({data}: Props) => {
  const {id, effects} = data;

  const t = useTranslations('Game');
  const uniqueEffects = toUnique(effects.map(({type}) => type));

  return (
    <Flex center className="gap-2">
      <Flex center className="gap-2 lg:flex-row">
        <MainSkillIcon id={id} dimension="size-16"/>
        <Flex noFullWidth center className="gap-2">
          <div className="text-3xl">
            {t(`MainSkill.Name.${id}`)}
          </div>
          <div className={clsx(
            'text-slate-600 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-600',
          )}>
            {t(`MainSkill.Description.${id}`)}
          </div>
        </Flex>
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <Flex direction="row" center className="gap-2">
        {uniqueEffects.map((effect) => (
          <MainSkillEffectTypeIcon key={effect} type={effect} dimension="size-10"/>
        ))}
      </Flex>
    </Flex>
  );
};
