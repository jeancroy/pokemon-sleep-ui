import React from 'react';

import {AdBlockState} from '@/components/ads/type';


export type UseAdBlockDetectorReturn = {
  adblockState: AdBlockState,
};

export type UseAdClickDetectorReturn = {
  contentRef: React.RefObject<HTMLDivElement>,
  onBlur: () => void,
  onPointerEnter: () => void,
  onPointerLeave: () => void,
};
