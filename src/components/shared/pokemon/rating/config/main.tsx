import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {ProgressBarSingle} from '@/components/progressBar/single';
import {LevelIcon} from '@/components/shared/icon/lv';
import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {ratingConfigWeightExpressButtonStyle} from '@/components/shared/pokemon/rating/config/const';
import {defaultRatingWeight} from '@/const/game/rating';
import {useSortedPokemonKeyLevels} from '@/hooks/pokemon/keyLevel/sorted';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {formatPokemonKeyLevel} from '@/utils/game/rating/format';


type Props = {
  initial: RatingConfig,
  show: boolean,
  setShow: (show: boolean) => void,
  onClose: (updated: RatingConfig) => void,
};

export const RatingConfigPopup = ({initial, show, setShow, onClose}: Props) => {
  const sortedKeyLevels = useSortedPokemonKeyLevels();

  const [config, setConfig] = React.useState(initial);

  const updateWeightOfLevel = (level: PokemonKeyLevel, updatedWeight: number) => setConfig(({
    weight,
    ...original
  }): RatingConfig => ({
    ...original,
    weight: {
      ...weight,
      [level]: updatedWeight,
    },
  }));

  const {weight} = config;
  const maxWeight = Math.max(...Object.values(weight));

  return (
    <PopupCommon show={show} setShow={(show) => {
      onClose(config);
      setShow(show);
    }}>
      <Flex className="gap-1">
        {sortedKeyLevels.map((level) => {
          const currentWeight = weight[level] ?? defaultRatingWeight[level] ?? NaN;

          return (
            <Flex key={level} className={clsx(
              'gap-1',
              (isNaN(currentWeight) || !currentWeight) && 'text-slate-400 dark:text-slate-500',
            )}>
              <Flex direction="row" center className="gap-1">
                <NumberInputRequired
                  text={
                    <Flex direction="row" center noFullWidth className="w-20 gap-1">
                      <LevelIcon dimension="size-6"/>
                      <div className="text-lg">{formatPokemonKeyLevel(level)}</div>
                    </Flex>
                  }
                  value={currentWeight}
                  setValue={(updatedWeight) => updateWeightOfLevel(level, updatedWeight)}
                  valueType="float"
                  min={0}
                  max={2}
                  step={0.05}
                  className="justify-center"
                />
                <button
                  className={ratingConfigWeightExpressButtonStyle}
                  onClick={() => updateWeightOfLevel(level, 0)}
                >
                  <XMarkIcon/>
                </button>
                <button
                  className={ratingConfigWeightExpressButtonStyle}
                  onClick={() => updateWeightOfLevel(level, 1)}
                >
                  1
                </button>
              </Flex>
              <ProgressBarSingle percent={currentWeight / maxWeight * 100} classBarHeight="h-1.5"/>
            </Flex>
          );
        })}
      </Flex>
    </PopupCommon>
  );
};
