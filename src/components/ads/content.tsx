import React from 'react';

import {clsx} from 'clsx';

import {adsHeight, adsHeightAdBlockActive} from '@/components/ads/const';
import {useAdBlockDetector} from '@/components/ads/hook/adBlockDetect';
import {useAdClickDetector} from '@/components/ads/hook/adClickDetect';
import {AdBlockState, AdsContentProps} from '@/components/ads/type';
import {AdBlockWarning} from '@/components/ads/warning';


type Props = AdsContentProps & {
  recheckDeps: React.DependencyList,
};

export const AdsContent = ({
  className,
  heightOverride,
  hideWarningOnDetected,
  recheckDeps,
  children,
}: React.PropsWithChildren<Props>) => {
  const [adblockState, setAdblockState] = React.useState<AdBlockState>({
    isBlocked: false,
  });

  useAdBlockDetector({
    setAdblockState,
    recheckDeps,
  });
  const {
    contentRef,
    ...adClickDetectProps
  } = useAdClickDetector();

  return (
    <div
      ref={contentRef}
      tabIndex={-1}
      {...adClickDetectProps}
      className={clsx(
        'relative w-full overflow-hidden focus:outline-none',
        adblockState.isBlocked ? adsHeightAdBlockActive : (heightOverride ?? adsHeight),
        className,
      )}
    >
      {adblockState.isBlocked && <AdBlockWarning hide={hideWarningOnDetected}/>}
      <div className="absolute left-0 top-0 size-full">
        {children}
      </div>
    </div>
  );
};
