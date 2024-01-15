import React from 'react';

import {useTranslations} from 'next-intl';


export const AdsPopupText = () => {
  const t = useTranslations('UI.Subscription');

  return (
    <div dangerouslySetInnerHTML={{__html: t.raw('Popup')}} className="markdown text-xl"/>
  );
};
