import React from 'react';

import BeakerIcon from '@heroicons/react/24/outline/BeakerIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  onClick: () => void,
  disabled?: boolean,
  ref?: React.ForwardedRef<HTMLButtonElement>,
};

const ButtonToStartTheSorceryInternal = ({
  onClick,
  disabled,
}: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
  return (
    <button ref={ref} onClick={onClick} disabled={disabled} className={clsx(
      'button-base w-full p-1',
      'enabled:bg-purple-400/50 enabled:hover:bg-purple-400',
      'enabled:dark:bg-purple-600/50 enabled:dark:hover:bg-purple-600',
      'disabled:button-disabled',
    )}>
      <Flex center>
        <BeakerIcon className="size-9"/>
      </Flex>
    </button>
  );
};

export const ButtonToStartTheSorcery = React.forwardRef(ButtonToStartTheSorceryInternal);
