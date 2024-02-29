import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {useTranslations} from 'next-intl';

import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {Flex} from '@/components/layout/flex/common';
import {teamMemberProductionSortingBasisI18nId} from '@/const/game/production/i18n';
import {textFilterButtonStyle} from '@/styles/input';
import {TeamMemberProductionSortingBasis, teamMemberProductionSortingBasis} from '@/types/game/team/production';


type Props = FilterInputOnClickProps<TeamMemberProductionSortingBasis | null>;

export const TeamMemberProductionSortingBasisInput = (props: Props) => {
  const t = useTranslations('UI.Producing.Stats');

  return (
    <FilterExpandedInput
      title={
        <Flex center>
          <Bars3BottomLeftIcon className="size-6"/>
        </Flex>
      }
      ids={[null, ...teamMemberProductionSortingBasis]}
      idToButton={(basis) => {
        if (basis === null) {
          return <XMarkIcon className="size-5"/>;
        }

        return <span>{t(teamMemberProductionSortingBasisI18nId[basis])}</span>;
      }}
      className={textFilterButtonStyle}
      {...props}
    />
  );
};
