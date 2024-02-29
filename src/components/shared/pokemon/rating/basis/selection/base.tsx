import React from 'react';

import MagnifyingGlassCircleIcon from '@heroicons/react/24/outline/MagnifyingGlassCircleIcon';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterExpandedInputProps} from '@/components/input/filter/expanded/type';
import {RatingBasisSelectionCommonProps} from '@/components/shared/pokemon/rating/basis/selection/type';
import {textFilterButtonStyle} from '@/styles/input';
import {RatingBasis} from '@/types/game/pokemon/rating/config';


type Props<TRatingBasis extends RatingBasis | null> =
  Pick<FilterExpandedInputProps<TRatingBasis>, 'ids' | 'idToButton'> &
  RatingBasisSelectionCommonProps<TRatingBasis>;

export const RatingBasisSelectionBase = <TRatingBasis extends RatingBasis | null>({
  current,
  onSelect,
  ...props
}: Props<TRatingBasis>) => {
  return (
    <FilterExpandedInput
      onClick={onSelect}
      isActive={(basis) => basis === current}
      title={<MagnifyingGlassCircleIcon className="size-6"/>}
      className={textFilterButtonStyle}
      {...props}
    />
  );
};
