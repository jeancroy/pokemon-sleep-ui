import React from 'react';

import {Failed} from '@/components/icons/failed';
import {defaultLocale} from '@/const/website';


export const Offline = () => {
  return (
    <html lang={defaultLocale}>
      <body>
        <Failed text="Offline"/>
      </body>
    </html>
  );
};
