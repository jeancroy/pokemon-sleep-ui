import React from 'react';

import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      <ReactMarkdown remarkPlugins={[remarkGfm]} className={premiumOnlyNoticeStyles[style]}>
        {t('PremiumOnly')}
      </ReactMarkdown>
    </Flex>
  );
};
