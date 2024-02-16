import React from 'react';

import ArrowUpCircleIcon from '@heroicons/react/24/outline/ArrowUpCircleIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonSubSkillIcon} from '@/components/shared/pokemon/subSkill/icon';
import {subSkillRarityDisabled, subSkillRaritySectionBg} from '@/styles/game/subSkill';
import {SubSkillData} from '@/types/game/pokemon/subSkill';


type Props = {
  data: SubSkillData,
};

export const SubSkillInfoSingle = ({data}: Props) => {
  const {id, next, rarity, bonus} = data;

  const t = useTranslations('Game.SubSkill');

  const bonusValue = Object.values(bonus).at(0) ?? '(?)';

  return (
    <Flex center className={clsx(
      'justify-between gap-1 rounded-lg p-2',
      rarity ? subSkillRaritySectionBg[rarity] : subSkillRarityDisabled,
    )}>
      <Flex direction="row" center className="gap-1 text-lg">
        <div className="self-end text-sm text-slate-600 dark:text-slate-400">#{id}</div>
        <PokemonSubSkillIcon subSkill={data}/>
        <div>{t(`Name.${id}`)}</div>
      </Flex>
      <div className="text-sm text-slate-600 dark:text-slate-400">
        {t(`Description.${id}`, {num: bonusValue})}
      </div>
      <Flex direction="row">
        <Flex direction="row" center className="gap-1.5">
          <ArrowUpCircleIcon className="size-5"/>
          <div className={clsx('text-sm', next ? 'text-green-700 dark:text-green-400' : 'text-slate-500')}>
            {next ? t(`Name.${next}`) : <XMarkIcon className="size-5"/>}
          </div>
        </Flex>
        <Flex direction="row" center className="gap-1.5">
          <ChevronUpIcon className="size-5"/>
          <div>{bonusValue}</div>
        </Flex>
      </Flex>
    </Flex>
  );
};
