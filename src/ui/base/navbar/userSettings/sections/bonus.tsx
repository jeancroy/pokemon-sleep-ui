import React from 'react';

import ArrowUpCircleIcon from '@heroicons/react/24/outline/ArrowUpCircleIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {MapBonusSlider} from '@/components/shared/production/bonus/map';
import {OverallBonusSlider} from '@/components/shared/production/bonus/overall';
import {UserBonus} from '@/types/game/bonus';
import {SleepMapId} from '@/types/game/sleepStyle';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';


type Props = {
  mapIds: SleepMapId[],
  maxMapBonusPercent: number,
  bonus: UserBonus,
  setBonus: (newBonus: UserBonus) => void,
  currentMap: SleepMapId,
  setCurrentMap: (map: SleepMapId) => void,
};

export const UserSettingsBonusUI = ({
  mapIds,
  maxMapBonusPercent,
  bonus,
  setBonus,
  currentMap,
  setCurrentMap,
}: Props) => {
  return (
    <UserSettingsSection titleIcon={<ArrowUpCircleIcon/>}>
      <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-2">
        {mapIds.map((mapId) => (
          <MapBonusSlider
            key={mapId}
            mapId={mapId}
            maxMapBonusPercent={maxMapBonusPercent}
            value={bonus.map[mapId] ?? 0}
            setValue={(value) => setBonus({
              ...bonus,
              map: {
                ...bonus.map,
                [mapId]: value,
              },
            })}
            isCurrent={currentMap === mapId}
            onMapClicked={() => setCurrentMap(mapId)}
          />
        ))}
      </Grid>
      <OverallBonusSlider value={bonus.overall} setValue={(overall) => setBonus({
        ...bonus,
        overall,
      })}/>
      <a href="/docs" className="button-clickable-glow h-8 w-8 self-end p-1">
        <Flex center className="h-full">
          <QuestionMarkCircleIcon/>
        </Flex>
      </a>
    </UserSettingsSection>
  );
};
