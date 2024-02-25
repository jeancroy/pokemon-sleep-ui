import React from 'react';

import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';

import {InputRow} from '@/components/input/filter/row';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {textFilterButtonStyle} from '@/styles/input';


type Props = {
  showStats: boolean,
  setShowStats: (updated: boolean) => void,
};

export const MealDisplayControl = ({showStats, setShowStats}: Props) => {
  return (
    <InputRow className="justify-end gap-2">
      <ToggleButton
        active={showStats}
        onClick={() => setShowStats(!showStats)}
        className={clsx('group', textFilterButtonStyle)}
      >
        <Flex direction="row" center noFullWidth className="gap-1">
          <div className="size-6">
            {showStats ? <EyeIcon/> : <EyeSlashIcon/>}
          </div>
          <InformationCircleIcon className="size-6"/>
        </Flex>
      </ToggleButton>
    </InputRow>
  );
};
