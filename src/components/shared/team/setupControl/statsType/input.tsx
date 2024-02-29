import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {useTranslations} from 'next-intl';

import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {teamMemberStatsTypeI18nId} from '@/components/shared/team/setupControl/statsType/const';
import {teamMemberStatsType, TeamMemberStatsType} from '@/types/game/team/statsType';


type Props = FilterInputOnClickProps<TeamMemberStatsType>;

export const TeamMemberStatsTypeInput = (props: Props) => {
  const t = useTranslations('UI.Component.Team.SetupControl.StatsType');

  return (
    <FilterTextInput
      title={<EyeIcon className="size-6"/>}
      ids={[...teamMemberStatsType]}
      idToText={(statsType) => t(teamMemberStatsTypeI18nId[statsType])}
      {...props}
    />
  );
};
