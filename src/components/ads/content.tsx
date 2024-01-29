import React from 'react';

import {clsx} from 'clsx';

import {adsHeight, adsHeightAdBlockActive} from '@/components/ads/const';
import {UseAdClickDetectorReturn} from '@/components/ads/hook/type';
import {AdBlockState, AdsContentProps} from '@/components/ads/type';
import {AdBlockWarning} from '@/components/ads/warning';


type Props = AdsContentProps & UseAdClickDetectorReturn & {
  adblockState: AdBlockState,
};

export const AdsContent = ({
  className,
  heightOverride,
  contentRef,
  children,
  adblockState,
  ...adClickDetectProps
}: React.PropsWithChildren<Props>) => {
  const {isBlocked} = adblockState;

  return (
    <div
      ref={contentRef}
      tabIndex={-1}
      {...adClickDetectProps}
      className={clsx(
        'relative w-full overflow-hidden focus:outline-none',
        isBlocked ? adsHeightAdBlockActive : (heightOverride ?? adsHeight),
        className,
      )}
    >
      {isBlocked && <AdBlockWarning/>}
      <div className="absolute left-0 top-0 size-full">
        {children}
      </div>
    </div>
  );
};
