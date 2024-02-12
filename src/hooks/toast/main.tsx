import React from 'react';

import {PremiumOnlyNotice} from '@/components/static/premium/notice';
import {showToast} from '@/utils/toast';


export const usePremiumRequiredToast = () => {
  const showPremiumRequiredToast = React.useCallback(() => showToast({
    isAlert: true,
    content: <PremiumOnlyNotice style="inverse"/>,
  }), []);

  return {showPremiumRequiredToast};
};
