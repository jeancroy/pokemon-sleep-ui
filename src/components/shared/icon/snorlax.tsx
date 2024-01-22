import React from 'react';

import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {Dimension} from '@/types/style';


type Props = {
  alt: string,
  dimension?: Dimension,
};

export const SnorlaxIcon = ({alt, dimension}: Props) => {
  return (
    <GenericIconLarger
      alt={alt}
      src="/images/generic/snorlax.png"
      dimension={dimension}
      noInvert
      noShrink
    />
  );
};
