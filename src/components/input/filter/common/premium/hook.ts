import React from 'react';

import {
  FilterPremiumRestrictableProps,
  UseFilterPremiumRestrictableReturn,
} from '@/components/input/filter/common/premium/type';
import {usePremiumRequiredToast} from '@/hooks/toast/main';
import {useUserActivation} from '@/hooks/userData/activation';


export const useFilterPremiumRestrictable = ({
  premiumOnly,
  session,
}: FilterPremiumRestrictableProps): UseFilterPremiumRestrictableReturn => {
  const {isPremium} = useUserActivation(session);
  const {showPremiumRequiredToast} = usePremiumRequiredToast();

  const isInputRestricted = premiumOnly != null && !isPremium;
  const isInputChangeRestricted = React.useCallback(() => {
    if (isInputRestricted) {
      showPremiumRequiredToast();
    }

    return isInputRestricted;
  }, [isInputRestricted]);

  return {
    isInputRestricted,
    isInputChangeRestricted,
    isPremium,
  };
};
