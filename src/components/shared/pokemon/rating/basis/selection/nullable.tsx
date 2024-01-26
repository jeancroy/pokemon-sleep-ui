import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

import {RatingBasisSelectionBase} from '@/components/shared/pokemon/rating/basis/selection/base';
import {RatingBasisSelectionCommonProps} from '@/components/shared/pokemon/rating/basis/selection/type';
import {RatingBasisTitle} from '@/components/shared/pokemon/rating/basis/title';
import {RatingBasis, ratingBasis} from '@/types/game/pokemon/rating/config';


export const RatingBasisSelectionNullable = (props: RatingBasisSelectionCommonProps<RatingBasis | null>) => {
  return (
    <RatingBasisSelectionBase
      {...props}
      ids={[null, ...ratingBasis]}
      idToButton={(basis, isActive) => (
        basis ? <RatingBasisTitle basis={basis} isActive={isActive}/> : <XMarkIcon className="size-6"/>
      )}
    />
  );
};
