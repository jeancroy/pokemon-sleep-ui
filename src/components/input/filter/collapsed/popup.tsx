import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';

import {InputBox} from '@/components/input/box';
import {FilterCollapsedInputProps} from '@/components/input/filter/collapsed/type';
import {FilterToggleButtons} from '@/components/input/filter/common/button';
import {Flex} from '@/components/layout/flex/common';
import {IndexableNonSymbol} from '@/utils/type';


export const FilterCollapsedInputPopup = <TId extends IndexableNonSymbol | null>({
  idToText,
  ...props
}: FilterCollapsedInputProps<TId>) => {
  const [search, setSearch] = React.useState('');

  return (
    <Flex noFullWidth className="max-w-xl gap-2">
      <Flex direction="row" center className="gap-1.5">
        <MagnifyingGlassIcon className="size-6"/>
        <InputBox
          type="text"
          value={search}
          onChange={({target}) => setSearch(target.value)}
          className="w-full"
        />
      </Flex>
      <FilterToggleButtons
        isHidden={(id) => !!search && !idToText(id).toUpperCase().includes(search.toUpperCase())}
        idToButton={idToText}
        {...props}
      />
    </Flex>
  );
};
