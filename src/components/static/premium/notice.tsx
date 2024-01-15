import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PremiumIcon} from '@/components/static/premium/icon';


type Props = {
  className?: string,
  hideIcon?: boolean,
};

export const PremiumOnlyNotice = ({className, hideIcon}: Props) => {
  const t = useTranslations('UI.Subscription');

  return (
    <Flex direction="row" center className="gap-1">
      {!hideIcon && <PremiumIcon/>}
      <div dangerouslySetInnerHTML={{__html: t.raw('PremiumOnly')}} className={className}/>
    </Flex>
  );
};
