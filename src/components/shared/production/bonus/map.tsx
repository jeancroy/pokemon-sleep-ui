import React from 'react';

import MapPinIcon from '@heroicons/react/24/outline/MapPinIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {BonusSlider} from '@/components/shared/production/bonus/base';
import {BonusSliderProps} from '@/components/shared/production/bonus/type';
import {imageGallerySizes} from '@/styles/image';
import {SleepMapId} from '@/types/game/sleepStyle';


type Props = BonusSliderProps & {
  mapId: SleepMapId,
  maxMapBonusPercent: number,
  isCurrent: boolean,
  onMapClicked: () => void,
};

export const MapBonusSlider = ({mapId, maxMapBonusPercent, isCurrent, onMapClicked, ...props}: Props) => {
  const {} = props;

  const t = useTranslations('Game.Field');

  const mapName = t(mapId.toString());

  return (
    <Flex direction="row" className="relative gap-1">
      <NextImage
        src={`/images/field/${mapId}.png`}
        alt={mapName}
        sizes={imageGallerySizes}
        className="absolute left-0 top-0 h-full rounded-lg opacity-60 dark:opacity-25"
      />
      <Flex center className="z-10 gap-1 p-2">
        <span className="whitespace-nowrap">{mapName}</span>
        <Flex direction="row" className="items-center gap-1">
          <ToggleButton active={isCurrent} onClick={onMapClicked} className={clsx(
            'glow h-fit rounded-full p-1.5 shadow-border',
          )}>
            <MapPinIcon className="size-6 shrink-0"/>
          </ToggleButton>
          <BonusSlider min={0} max={maxMapBonusPercent} step={5} {...props}>
            <ChevronUpIcon className="size-6"/>
          </BonusSlider>
        </Flex>
      </Flex>
    </Flex>
  );
};
