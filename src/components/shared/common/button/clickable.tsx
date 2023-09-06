import React from 'react';

import {Flex} from '@/components/layout/flex';


type Props = {
  disabled?: boolean,
  onClick: () => void,
};

export const ClickableIconButton = ({disabled, onClick, children}: React.PropsWithChildren<Props>) => {
  return (
    <button
      className="enabled:button-clickable-bg disabled:button-disabled relative h-8 w-14"
      disabled={disabled}
      onClick={onClick}
    >
      <Flex direction="col" center className="h-7">
        {children}
      </Flex>
    </button>
  );
};