import React from 'react';

import MapPinIcon from '@heroicons/react/24/outline/MapPinIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';

import {Flex} from '@/components/layout/flex/common';
import {MapToggle} from '@/components/shared/map/toggle';
import {BonusSlider} from '@/components/shared/production/bonus/base';
import {BonusSliderProps} from '@/components/shared/production/bonus/type';
import {SleepMapId} from '@/types/game/sleepStyle';


type Props = BonusSliderProps & {
  mapId: SleepMapId,
  maxMapBonusPercent: number,
  isCurrent: boolean,
  onMapClicked: () => void,
};

export const MapBonusSlider = ({mapId, isCurrent, onMapClicked, ...props}: Props) => {
  return (
    <Flex direction="row" className="gap-1">
      <MapToggle mapId={mapId} className="w-72" isActive={isCurrent} onClick={onMapClicked}/>
      <BonusSlider min={0} max={100} step={5} {...props}>
        <MapPinIcon className="h-6 w-6"/>
        <ChevronUpIcon className="h-6 w-6"/>
      </BonusSlider>
    </Flex>
  );
};
