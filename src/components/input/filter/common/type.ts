import React from 'react';

import {InputRowProps} from '@/components/input/filter/type';
import {IndexableNonSymbol} from '@/utils/type';


export type FilterInputOnClickProps<TId> = {
  onClick: (id: TId) => void,
  isActive: (id: TId) => boolean,
};

export type FilterRowBackgroundStyle = 'none' | 'normal' | 'highlight';

export type FilterToggleButtonsProps<TId extends IndexableNonSymbol | null> = FilterInputOnClickProps<TId> & {
  ids: TId[],
  isHidden?: (id: TId) => boolean,
  idToButton: (id: TId, isActive: boolean) => React.ReactNode,
  noWrap?: boolean,
  disabled?: boolean,
  className?: string,
};

export type FilterInputLayoutProps = Omit<InputRowProps, 'className'> & {
  title: React.ReactNode,
};

export type FilterInputCommonProps<TId extends IndexableNonSymbol | null> =
  FilterInputLayoutProps &
  FilterToggleButtonsProps<TId>;

