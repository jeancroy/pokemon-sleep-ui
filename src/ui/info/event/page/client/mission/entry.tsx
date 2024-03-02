import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {ItemPackUI} from '@/components/shared/item/pack';
import {MissionUI} from '@/components/shared/mission/main';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {EventMission} from '@/types/game/event/mission';


type Props = {
  mission: EventMission,
};

export const EventPageMissionEntry = ({mission}: Props) => {
  const {pokedexMap} = useCommonServerData();

  const {reward} = mission;

  return (
    <Flex className="bg-plate gap-1">
      <Flex className="text-left">
        <MissionUI mission={mission}/>
      </Flex>
      <HorizontalSplitter/>
      <ItemPackUI pokedexMap={pokedexMap} itemPack={reward} className="self-end"/>
    </Flex>
  );
};
