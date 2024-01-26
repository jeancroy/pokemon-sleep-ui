import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {Locale} from '@/types/next/locale';
import {PageLayout} from '@/ui/base/layout/common';


type Props = {
  locale: Locale,
};

export const AuthLayout = ({locale, children}: React.PropsWithChildren<Props>) => {
  return (
    <PageLayout noUserControl locale={locale}>
      <Flex center>
        <Flex center className="gap-5 sm:w-2/3 md:w-1/2 xl:w-1/3">
          <div className="relative size-36">
            <NextImage
              src="/images/rank/4.png"
              alt="Pokemon Sleep"
              sizes={imageIconSizes}
            />
          </div>
          {children}
        </Flex>
      </Flex>
    </PageLayout>
  );
};
