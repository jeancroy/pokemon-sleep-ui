'use client';
import React from 'react';

import {CommonServerDataContext} from '@/contexts/data/common/context';
import {CommonServerDataCollection} from '@/types/website/data/common';


type Props = {
  data: CommonServerDataCollection,
};

export const CommonDataClientProvider = ({data, children}: React.PropsWithChildren<Props>) => {
  return (
    <CommonServerDataContext.Provider value={data}>
      {children}
    </CommonServerDataContext.Provider>
  );
};
