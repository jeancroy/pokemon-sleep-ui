import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {premiumOnlyNoticeStyles} from '@/components/static/premium/const';
import {PremiumIcon} from '@/components/static/premium/icon';
import {PremiumOnlyNoticeStyle} from '@/components/static/premium/type';


type Props = {
  style: PremiumOnlyNoticeStyle,
  hideIcon?: boolean,
};

export const PremiumOnlyNotice = ({style, hideIcon}: Props) => {
  const t = useTranslations('UI.Subscription');

  return (
    <Flex direction="row" center className="gap-1">
      {!hideIcon && <PremiumIcon/>}
      <div dangerouslySetInnerHTML={{__html: t.raw('PremiumOnly')}} className={premiumOnlyNoticeStyles[style]}/>
    </Flex>
  );
};
