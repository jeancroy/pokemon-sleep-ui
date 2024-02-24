import {sleepdexLookupEntriesSortBasisGetter} from '@/ui/sleepStyle/sleepdex/lookup/calc/const';
import {SleepdexLookupDataCalcWorkerOpts} from '@/ui/sleepStyle/sleepdex/lookup/calc/type';
import {SleepdexLookupDataEntry} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';


const onMessage = async ({data}: MessageEvent<SleepdexLookupDataCalcWorkerOpts>) => {
  const {entries, sort, isIncluded} = data;

  const result: SleepdexLookupDataEntry[] = entries
    .filter(({sleepStyle}) => isIncluded[sleepStyle.internalId])
    .map((data) => ({
      data,
      sortBasis: sleepdexLookupEntriesSortBasisGetter[sort](data),
    }))
    .sort((a, b) => b.sortBasis - a.sortBasis)
    .map(({data}) => data);

  postMessage(result);
};

addEventListener('message', onMessage);
