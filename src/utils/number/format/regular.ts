import {NumberFormat} from '@/types/number';
import {isNotNullish} from '@/utils/type';


export const formatter: {[format in NumberFormat]: ReturnType<typeof Intl.NumberFormat>} = {
  int: new Intl.NumberFormat(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}),
  float1: new Intl.NumberFormat(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}),
  float: new Intl.NumberFormat(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
  float3: new Intl.NumberFormat(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3}),
};

export const formatFloat1 = (num: number | null | undefined): string => {
  if (isNotNullish(num)) {
    return formatter.float1.format(num);
  }

  return '-';
};

export const formatFloat = (num: number | null | undefined): string => {
  if (isNotNullish(num)) {
    return formatter.float.format(num);
  }

  return '-';
};

export const formatFloat3 = (num: number | null | undefined): string => {
  if (isNotNullish(num)) {
    return formatter.float3.format(num);
  }

  return '-';
};


export const formatInt = (num: number | null | undefined): string => {
  if (isNotNullish(num)) {
    return formatter.int.format(num);
  }

  return '-';
};

export type FormatNumberOpts = {
  format: NumberFormat,
  num: number | null | undefined,
};

export const formatNumber = ({format, num}: FormatNumberOpts): string | null => {
  if (!isNotNullish(num)) {
    return null;
  }

  return formatter[format].format(num);
};
