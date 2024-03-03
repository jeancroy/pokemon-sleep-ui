import {NumberFormat} from '@/types/number';
import {isNotNullish, Nullable} from '@/utils/type';


export const formatter: {[format in NumberFormat]: ReturnType<typeof Intl.NumberFormat>} = {
  int: new Intl.NumberFormat(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}),
  float1: new Intl.NumberFormat(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}),
  float: new Intl.NumberFormat(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
  float3: new Intl.NumberFormat(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3}),
  float4: new Intl.NumberFormat(undefined, {minimumFractionDigits: 4, maximumFractionDigits: 4}),
};

export const formatFloat1 = (num: Nullable<number>): string => {
  if (isNotNullish(num)) {
    return formatter.float1.format(num);
  }

  return '-';
};

export const formatFloat = (num: Nullable<number>): string => {
  if (isNotNullish(num)) {
    return formatter.float.format(num);
  }

  return '-';
};

export const formatFloat3 = (num: Nullable<number>): string => {
  if (isNotNullish(num)) {
    return formatter.float3.format(num);
  }

  return '-';
};

export const formatFloat4 = (num: Nullable<number>): string => {
  if (isNotNullish(num)) {
    return formatter.float4.format(num);
  }

  return '-';
};

export const formatInt = (num: Nullable<number>): string => {
  if (isNotNullish(num)) {
    return formatter.int.format(num);
  }

  return '-';
};

export type FormatNumberOpts = {
  format: NumberFormat,
  num: Nullable<number>,
};

export const formatNumber = ({format, num}: FormatNumberOpts): string | null => {
  if (!isNotNullish(num)) {
    return null;
  }

  return formatter[format].format(num);
};
