import React from 'react';

import InboxIcon from '@heroicons/react/24/outline/InboxIcon';
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokemonKeyLevelInput} from '@/components/shared/pokemon/level/input';
import {textFilterButtonStyle} from '@/styles/input';
import {teamMakerSourceI18nId} from '@/ui/team/maker/const';
import {TeamMakerBasisOption} from '@/ui/team/maker/input/basis';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';
import {teamMakerMemberCount} from '@/ui/team/maker/type/common';
import {teamMakerBasis, teamMakerSource} from '@/ui/team/maker/type/input';


export const TeamMakerInputGeneral = ({
  input,
  setInput,
}: TeamMakerInputCommonProps) => {
  const {source} = input;

  const t = useTranslations('UI.InPage.Team.Maker');

  return (
    <>
      <FilterTextInput
        title={
          <Flex center>
            <InboxIcon className="size-6"/>
          </Flex>
        }
        ids={[...teamMakerSource]}
        idToText={(source) => t(teamMakerSourceI18nId[source])}
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'source',
          allowNull: false,
        })}
      />
      <FilterExpandedInput
        title={
          <Flex center>
            <UserCircleIcon className="size-6"/>
          </Flex>
        }
        ids={[...teamMakerMemberCount]}
        idToButton={(memberCount) => memberCount}
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'memberCount',
          allowNull: false,
        })}
      />
      <FilterExpandedInput
        title={t('Basis')}
        ids={[...teamMakerBasis]}
        idToButton={(basis) => (
          <TeamMakerBasisOption basis={basis} isActive={basis === input.basis}/>
        )}
        className={textFilterButtonStyle}
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'basis',
          allowNull: false,
        })}
      />
      <AnimatedCollapse show={source === 'pokebox'}>
        <PokemonKeyLevelInput
          {...getSingleSelectOnClickProps({
            filter: input,
            setFilter: setInput,
            filterKey: 'previewLevel',
            allowNull: false,
          })}
        />
      </AnimatedCollapse>
    </>
  );
};
