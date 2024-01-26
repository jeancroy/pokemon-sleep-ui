import {clsx} from 'clsx';

import {PokemonInventoryCommonProps} from '@/components/shared/pokemon/inventory/type';


export const getPackStatsStyle = ({normalTextSize, className}: PokemonInventoryCommonProps) => clsx(
  'items-center gap-0.5',
  !normalTextSize && 'text-sm',
  className,
);
