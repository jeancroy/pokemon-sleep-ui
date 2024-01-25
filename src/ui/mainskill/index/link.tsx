import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';


type Props = {
  data: MainSkillData,
};

export const MainSkillLink = ({data}: Props) => {
  const {id} = data;

  const t = useTranslations('Game');

  return (
    <FlexLink direction="row" center href={`/info/mainskill/${id}`} className="button-clickable-bg group gap-2 p-4">
      <MainSkillIcon id={id} dimension="size-12"/>
      <Flex center className="gap-1">
        <div className="text-center text-xl">
          {t(`MainSkill.Name.${id}`)}
        </div>
        <HorizontalSplitter className="w-full"/>
        <Flex className={clsx(
          'text-sm text-slate-600 group-hover:text-slate-400 dark:text-slate-400 dark:group-hover:text-slate-600',
        )}>
          {t(`MainSkill.Description.${id}`)}
        </Flex>
      </Flex>
    </FlexLink>
  );
};
