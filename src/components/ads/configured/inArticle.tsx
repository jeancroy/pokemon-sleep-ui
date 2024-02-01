import React from 'react';

import {AdsUnitProps} from '@/components/ads/type';
import {AdsUnitInArticle} from '@/components/ads/unit/inArticle';
import {I18nAutoWrap} from '@/components/i18n/autoWrap';


export const AdsConfiguredInArticle = (props: AdsUnitProps) => (
  <I18nAutoWrap>
    <AdsUnitInArticle
      {...props}
      slot={{
        light: '7416568352',
        dark: '3982937416',
      }}
    />
  </I18nAutoWrap>
);
