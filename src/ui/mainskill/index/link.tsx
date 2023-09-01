import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {MainSkillEffectTypeIcon} from '@/components/shared/pokemon/mainSkill/typeIcon';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';


type Props = {
  data: MainSkillData,
};

export const MainSkillLink = ({data}: Props) => {
  const {id, effects} = data;

  const t = useTranslations('Game');

  return (
    <Link href={`/mainskill/${id}`} className="button-clickable-bg group p-2">
      <Flex direction="col" center className="gap-1">
        <Flex direction="row" center className="gap-1">
          <div className="relative h-6 w-6">
            <MainSkillEffectTypeIcon type={effects[0].type}/>
          </div>
          <div>
            {t(`MainSkill.Name.${id}`)}
          </div>
        </Flex>
        <HorizontalSplitter className="w-full"/>
        <Flex direction="col" className={clsx(
          'text-sm text-slate-600 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-600',
        )}>
          {t(`MainSkill.Description.${id}`)}
        </Flex>
      </Flex>
    </Link>
  );
};