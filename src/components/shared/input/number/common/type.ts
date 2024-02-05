import React from 'react';

import {Nullable} from '@/utils/type';


export type NumberInputLayoutProps<TValue extends Nullable<number>> = {
  text: React.ReactNode,
  value: TValue,
  setValue: (value: TValue) => void,
  formatValue?: (value: TValue) => string,
  onClickDefault?: number,
  min?: number,
  max?: number,
  step?: number,
  className?: string,
  classOfText?: string,
  disabled?: boolean,
};
