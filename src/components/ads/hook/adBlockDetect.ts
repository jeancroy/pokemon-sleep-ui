import React from 'react';

import {useDetectAdBlock} from 'adblock-detect-react';

import {UseAdBlockDetectorReturn} from '@/components/ads/hook/type';
import {AdBlockState} from '@/components/ads/type';


type UseAdBlockDetectorOpts = {
  recheckDeps: React.DependencyList,
};

export const useAdBlockDetector = ({recheckDeps}: UseAdBlockDetectorOpts): UseAdBlockDetectorReturn => {
  const adBlockDetected = useDetectAdBlock();
  const [adblockState, setAdblockState] = React.useState<AdBlockState>({
    isBlocked: false,
  });

  React.useEffect(() => {
    setAdblockState({isBlocked: adBlockDetected});
  }, [...recheckDeps, adBlockDetected]);

  return {adblockState};
};
