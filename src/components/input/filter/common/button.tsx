import React from 'react';

import {FilterToggleButtonsProps} from '@/components/input/filter/common/type';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {IndexableNonSymbol} from '@/utils/type';


export const FilterToggleButtons = <TId extends IndexableNonSymbol | null>({
  onClick,
  isActive,
  ids,
  isHidden = () => false,
  idToButton,
  noWrap,
  disabled,
  className,
}: FilterToggleButtonsProps<TId>) => {
  return (
    <Flex noFullWidth direction="row" center wrap={!noWrap} className="gap-1 sm:justify-normal">
      {ids.filter((id) => !isHidden(id)).map((id) => {
        const active = isActive(id);

        return (
          <ToggleButton
            key={id}
            active={active}
            onClick={() => onClick(id)}
            className={className}
            disabled={disabled}
          >
            {idToButton(id, active)}
          </ToggleButton>
        );
      })}
    </Flex>
  );
};
