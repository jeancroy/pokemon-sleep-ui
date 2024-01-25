import {NumberFormat} from '@/types/number';
import {isNotNullish} from '@/utils/type';


const formatter: {[format in NumberFormat]: ReturnType<typeof Intl.NumberFormat>} = {
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

type FormatNumberOpts = {
  format: NumberFormat,
  num: number | null | undefined,
};

export const formatNumber = ({format, num}: FormatNumberOpts): string | null => {
  if (!isNotNullish(num)) {
    return null;
  }

  return formatter[format].format(num);
};

export const formatSignedNumber = ({format, num}: FormatNumberOpts): string | null => {
  if (!isNotNullish(num) || isNaN(num)) {
    return null;
  }

  return `${num > 0 ? '+' : ''}${formatter[format].format(num)}`;
};

type FormatToAbbreviationOpts = {
  num: number | undefined,
  decimals?: number
};

export const formatToAbbreviation = ({num, decimals}: FormatToAbbreviationOpts): string => {
  if (!num) {
    return '-';
  }

  const numForCheck = Math.abs(num); // For handling negative number
  decimals = decimals ?? 1;

  if (numForCheck >= 1E9) {
    return `${(num / 1E9).toFixed(decimals)} B`;
  }

  if (numForCheck >= 1E6) {
    return `${(num / 1E6).toFixed(decimals)} M`;
  }

  if (numForCheck >= 1E3) {
    return `${(num / 1E3).toFixed(decimals)} K`;
  }

  return parseFloat(num.toFixed(decimals)).toString();
};

