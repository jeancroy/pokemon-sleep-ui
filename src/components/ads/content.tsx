import React from 'react';

import {clsx} from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {adsHeight, adsMessage} from '@/components/ads/const';
import {useAdBlockDetector} from '@/components/ads/hook';
import {AdBlockState} from '@/components/ads/type';
import {defaultLocale} from '@/const/website';
import {Locale} from '@/types/next/locale';
import {isProduction} from '@/utils/environment';


type Props = {
  locale: Locale,
  className?: string,
  fullHeight?: boolean,
};

export const AdsContent = ({locale, className, fullHeight, children}: React.PropsWithChildren<Props>) => {
  const [adblockState, setAdblockState] = React.useState<AdBlockState>({
    adsFound: false,
    isBlocked: false,
  });

  const adsRef = useAdBlockDetector({
    setAdblockState,
  });

  return (
    <div className={clsx(
      'relative w-full overflow-auto',
      fullHeight ? 'h-full' : adsHeight,
      adblockState.isBlocked && (isProduction() ? 'rounded-lg bg-red-500/40' : 'border border-green-500'),
      className,
    )}>
      {
        adblockState.isBlocked &&
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={clsx(
          'flex h-full w-full flex-col items-center justify-center text-center text-xl',
        )}>
          {adsMessage[locale] ?? adsMessage[defaultLocale]}
        </ReactMarkdown>
      }
      <div ref={adsRef} className="absolute left-0 top-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};
