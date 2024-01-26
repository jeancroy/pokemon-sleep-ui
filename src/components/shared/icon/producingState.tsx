import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {SleepIcon} from '@/components/shared/icon/sleep';
import {IconProps} from '@/components/shared/icon/type';
import {ProducingStateWithPack} from '@/types/game/producing/state';


type Props = IconProps & {
  state: ProducingStateWithPack,
};

export const ProducingStateIcon = ({state, ...props}: Props) => {
  if (state === 'awake') {
    return <></>;
  }

  if (state === 'sleep1Vacant' || state === 'sleep1Filled') {
    return (
      <Flex direction="row" noFullWidth className="gap-1">
        <SleepIcon {...props}/>
        <span>1</span>
      </Flex>
    );
  }

  if (state === 'sleep2Vacant' || state === 'sleep2Filled') {
    return (
      <Flex direction="row" noFullWidth className="gap-1">
        <SleepIcon {...props}/>
        <span>2</span>
      </Flex>
    );
  }

  throw new Error(`Unhandled producing state [${state satisfies ProducingStateWithPack}] for icon`);
};
