import React from 'react';

import {RatingPopupControl, RatingPopupControlState} from '@/components/shared/pokemon/rating/type';


export const useRatingPopup = (): RatingPopupControl => {
  const [state, setState] = React.useState<RatingPopupControlState>({
    show: false,
    request: undefined,
  });

  return {
    state,
    setState,
    sendRequest: (setup) => setState({
      show: true,
      request: {
        timestamp: Date.now(),
        setup,
      },
    }),
  };
};
