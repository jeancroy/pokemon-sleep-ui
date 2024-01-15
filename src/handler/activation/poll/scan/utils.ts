import {ValueIteratee, uniqBy} from 'lodash';

import {ActivationScanResult} from '@/handler/activation/poll/scan/type';


type MergeScanResultOpts<TMember> = {
  results: ActivationScanResult<TMember>[],
  getId: ValueIteratee<TMember>,
};

export const mergeScanResult = <TMember>({
  results,
  getId,
}: MergeScanResultOpts<TMember>): ActivationScanResult<TMember> => {
  return {
    toSendActivation: uniqBy(results.flatMap(({toSendActivation}) => toSendActivation), getId),
    toUpdateExpiry: uniqBy(results.flatMap(({toUpdateExpiry}) => toUpdateExpiry), getId),
    toDeactivate: uniqBy(results.flatMap(({toDeactivate}) => toDeactivate), ({key}) => key),
  };
};
