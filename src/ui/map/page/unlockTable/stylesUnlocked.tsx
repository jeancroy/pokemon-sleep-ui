import React from 'react';

import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {Flex} from '@/components/layout/flex/common';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSleepTypeId} from '@/types/game/pokemon';


type Props = {
  sleepType: PokemonSleepTypeId | null,
  unlocked: number | undefined,
  unlockable: number | undefined,
};

export const MapUnlockTableStylesUnlocked = ({sleepType, unlocked, unlockable}: Props) => {
  return (
    <Flex direction="row" center noFullWidth className="gap-1">
      {
        sleepType !== null ?
          <PokemonSleepType sleepType={sleepType} dimension="h-4 w-4" hideText/> :
          <div className="h-6 w-6">
            <XCircleIcon/>
          </div>
      }
      {
        unlocked !== undefined && unlockable !== undefined &&
        (
          unlocked !== unlockable ?
            <CompletionResultUI completed={unlocked} total={unlockable}/> :
            <div className="h-6 w-6">
              <CheckIcon/>
            </div>
        )
      }
    </Flex>
  );
};
