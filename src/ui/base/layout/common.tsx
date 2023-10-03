import React from 'react';

import {clsx} from 'clsx';
import Script from 'next/script';
import {getServerSession} from 'next-auth';
import {Toaster} from 'react-hot-toast';

import {adsClientId} from '@/components/ads/const';
import {Announcements} from '@/components/announcement/main';
import {Loading, LoadingFullScreen} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {UiPageProps} from '@/ui/base/layout/type';
import {NavListContent} from '@/ui/base/navbar/list/content';
import {NavBar} from '@/ui/base/navbar/main';
import {isProduction} from '@/utils/environment';


export const PageLayout = ({
  announcement = true,
  children,
  ...props
}: React.PropsWithChildren<UiPageProps>) => {
  const {locale} = props;

  const session = React.use(getServerSession(authOptions));

  return (
    <React.Suspense fallback={<LoadingFullScreen/>}>
      {/* Google AdSense */}
      {isProduction() && !session?.user.isAdsFree &&
        <Script
          async
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClientId}`}
          crossOrigin="anonymous"
        />}
      <Toaster position="bottom-center" toastOptions={{duration: 3000}}/>
      <Flex className="h-full">
        <Flex direction="row" className={clsx(
          'items-center gap-1.5',
          'border-b border-b-gray-700 bg-slate-300/90 dark:bg-slate-900/90',
        )}>
          <NavBar {...props}/>
        </Flex>
        <Flex direction="row" className="grow overflow-hidden">
          <Flex className="hidden max-w-xs lg:flex">
            <I18nProvider locale={locale} namespaces={['UI.Metadata']}>
              <NavListContent/>
            </I18nProvider>
          </Flex>
          <div className="h-full w-full overflow-y-scroll">
            <Flex className="gap-1.5 p-2">
              {announcement && <Announcements/>}
              <React.Suspense fallback={<Loading/>}>
                {children}
              </React.Suspense>
            </Flex>
          </div>
        </Flex>
      </Flex>
    </React.Suspense>
  );
};
