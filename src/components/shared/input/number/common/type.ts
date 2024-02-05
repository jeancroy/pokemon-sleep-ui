import React from 'react';

import {Nullable} from '@/utils/type';


export const numberInputValueType = [
  'integer',
  'float',
] as const;

export type NumberInputValueType = typeof numberInputValueType[number];

export type NumberInputValueCommonProps<TValue extends Nullable<number>> = {
  value: TValue,
  valueType?: NumberInputValueType,
};

export type NumberInputLayoutProps<TValue extends Nullable<number>> = NumberInputValueCommonProps<TValue> & {
  text: React.ReactNode,
  setValue: (value: TValue) => void,
  onClickDefault?: number,
  min?: number,
  max?: number,
  step?: number,
  className?: string,
  classOfText?: string,
  disabled?: boolean,
};
