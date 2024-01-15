import React from 'react';

import {useDetectAdBlock} from 'adblock-detect-react';

import {AdBlockState} from '@/components/ads/type';


type UseAdBlockDetectorOpts = {
  setAdblockState: React.Dispatch<React.SetStateAction<AdBlockState>>,
  recheckDeps: React.DependencyList,
};

export const useAdBlockDetector = ({setAdblockState, recheckDeps}: UseAdBlockDetectorOpts) => {
  const adBlockDetected = useDetectAdBlock();

  React.useEffect(() => {
    setAdblockState({isBlocked: adBlockDetected});
  }, [...recheckDeps, adBlockDetected]);
};
