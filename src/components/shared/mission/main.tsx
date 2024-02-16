import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {Mission} from '@/types/game/mission';


type Props = {
  mission: Mission,
};

export const MissionUI = ({mission}: Props) => {
  const t = useTranslations('Game.WeeklyMission');

  if (mission.mission === 'rank') {
    return (
      <Flex direction="row" className="gap-1">
        {t.rich('rank', {
          SnorlaxRank: () => <SnorlaxRankUI rank={mission.rank}/>,
        })}
      </Flex>
    );
  }

  return t(mission.mission, {num: mission.count});
};
