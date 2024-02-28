import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {MainSkillIcon} from '@/components/shared/icon/mainSkill/main';
import {TeamMemberStats} from '@/components/shared/team/member/content/stats';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {formatFloat} from '@/utils/number/format/regular';


export const TeamMemberDetails = (props: TeamMemberProps) => {
  const {
    pokemon,
    rate,
  } = props;
  const {skill} = pokemon;
  const {intermediate} = rate;
  const {skillTrigger} = intermediate;

  const t = useTranslations('Game');

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
        <span>{formatFloat(skillTrigger.ratePercent)}%</span>
      </FlexLink>
      <HorizontalSplitter/>
      <TeamMemberStats type="frequency" {...props}/>
      <HorizontalSplitter/>
      <TeamMemberStats type="energy" {...props}/>
      <HorizontalSplitter/>
      <TeamMemberStats type="inventory" {...props}/>
      <HorizontalSplitter/>
      <TeamMemberStats type="berry" {...props}/>
      <HorizontalSplitter/>
      <TeamMemberStats type="ingredient" {...props}/>
      <HorizontalSplitter/>
      <TeamMemberStats type="skill" {...props}/>
    </Flex>
  );
};
