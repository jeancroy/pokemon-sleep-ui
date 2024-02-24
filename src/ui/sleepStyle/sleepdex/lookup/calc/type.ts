import {FilterInclusionMap} from '@/components/input/filter/type';
import {SleepStyleInternalId} from '@/types/game/sleepStyle';
import {
  SleepdexLookupDataEntry,
  SleepdexLookupSortType,
} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';


export type SleepdexLookupDataCalcWorkerOpts = {
  entries: SleepdexLookupDataEntry[],
  isIncluded: FilterInclusionMap<SleepStyleInternalId>,
  sort: SleepdexLookupSortType,
};
