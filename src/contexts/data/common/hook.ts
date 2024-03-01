import React from 'react';

import {CommonServerDataContext} from '@/contexts/data/common/context';
import {CommonServerDataCollection} from '@/types/website/data/common';


export const useCommonServerData = (): CommonServerDataCollection => {
  const data = React.useContext(CommonServerDataContext);

  if (!data) {
    throw new Error(
      'Data unavailable, make sure `<CommonDataProvider/>` is called before calling `useCommonServerData()`',
    );
  }

  return data;
};
