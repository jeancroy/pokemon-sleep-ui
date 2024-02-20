import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';

import {FilterCollapsedInputPopup} from '@/components/input/filter/collapsed/popup';
import {FilterCollapsedInputProps} from '@/components/input/filter/collapsed/type';
import {FilterToggleButtons} from '@/components/input/filter/common/button';
import {FilterInputLayout} from '@/components/input/filter/common/layout';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {IndexableNonSymbol} from '@/utils/type';


type Props<TId extends IndexableNonSymbol | null> = Omit<FilterCollapsedInputProps<TId>, 'idToButton'>;

export const FilterCollapsedInput = <TId extends IndexableNonSymbol | null>(props: Props<TId>) => {
  const {
    isActive,
    idToText,
    ...rest
  } = props;
  const [show, setShow] = React.useState(false);

  return (
    <FilterInputLayout {...rest}>
      <PopupCommon show={show} setShow={setShow}>
        <FilterCollapsedInputPopup {...props}/>
      </PopupCommon>
      <Flex noFullWidth direction="row" center className="gap-1">
        <FlexButton className="button-clickable-bg p-1" onClick={() => setShow(true)}>
          <PlusCircleIcon className="size-6"/>
        </FlexButton>
        <FilterToggleButtons
          idToButton={idToText}
          isHidden={(id) => !isActive(id)}
          {...props}
          // Force overwrite `onClick` in props so clicking on the active option opens the dialog
          onClick={() => setShow(true)}
        />
      </Flex>
    </FilterInputLayout>
  );
};
