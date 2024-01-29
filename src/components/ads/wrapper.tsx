import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {adsRefreshIntervalMs} from '@/components/ads/const';
import {AdsContent} from '@/components/ads/content';
import {useAdBlockDetector} from '@/components/ads/hook/adBlockDetect';
import {useAdClickDetector} from '@/components/ads/hook/adClickDetect';
import {AdsUnitProps} from '@/components/ads/type';
import {Flex} from '@/components/layout/flex/common';
import {useTimedTick} from '@/hooks/timedTick';
import {useUserActivation} from '@/hooks/userData/activation';


export const AdsWrapper = ({
  alwaysSingle,
  hideIfNotBlocked,
  className,
  children,
  ...props
}: React.PropsWithChildren<AdsUnitProps>) => {
  const {data, status} = useSession();
  const activation = useUserActivation(data);
  // Running `update()` of `useSession` puts the status to `loading`,
  // which causes the ads to blink briefly for users with ads
  // Therefore caching the ads-free status when the session loading is settled
  const [isAdsFree, setIsAdsFree] = React.useState<boolean | null>(null);
  // Used to force ads rerender
  const counter = useTimedTick({
    onTick: () => void 0,
    intervalMs: adsRefreshIntervalMs,
    rescheduleDeps: [],
  });

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      setIsAdsFree(false);
    } else if (status === 'authenticated') {
      setIsAdsFree(activation.isAdsFree);
    }
  }, [status]);

  const {adblockState} = useAdBlockDetector({recheckDeps: [counter]});
  const adClickDetector = useAdClickDetector();

  // `isAdsFree` can be `null` indicating not loaded yet, which is falsy
  // When `isAdsFree` is `null`, it shouldn't render anything because the app hasn't determined
  // if the user is ads free yet
  if (isAdsFree !== false || (!adblockState.isBlocked && hideIfNotBlocked)) {
    return null;
  }

  return (
    <Flex direction="row" className={clsx('h-full', className)}>
      <AdsContent
        key={`${counter}a`}
        adblockState={adblockState}
        {...adClickDetector}
        {...props}
      >
        {children}
      </AdsContent>
      {
        !alwaysSingle &&
        <AdsContent
          key={`${counter}b`}
          adblockState={adblockState}
          className="hidden lg:block"
          {...adClickDetector}
          {...props}
        >
          {children}
        </AdsContent>
      }
    </Flex>
  );
};
