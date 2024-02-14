import {FilterEnforcerOpts} from '@/components/input/filter/type';
import {
  SleepdexLookupFilter,
  SleepdexLookupFilterEnforcingCommonOpts,
} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';


type EnforceFilterSelectedMapToShowSnorlaxRankOpts =
  FilterEnforcerOpts<SleepdexLookupFilter> &
  SleepdexLookupFilterEnforcingCommonOpts;

export const enforceFilterSelectedMapToShowSnorlaxRank = ({
  original,
  updated,
  isPremium,
  showMapToast,
  showPremiumRequired,
}: EnforceFilterSelectedMapToShowSnorlaxRankOpts): SleepdexLookupFilter | null => {
  const isMinSnorlaxRankDisplay = updated.display === 'minSnorlaxRank';
  const isMinSnorlaxRankSort = updated.sort === 'minSnorlaxRank';

  if (isMinSnorlaxRankSort || isMinSnorlaxRankDisplay) {
    if (!isPremium) {
      showPremiumRequired();
      return null;
    }

    if (original.mapId === null) {
      showMapToast();
      return null;
    }

    if (updated.mapId === null) {
      return {
        ...updated,
        sort: isMinSnorlaxRankSort ? 'drowsyPowerRequirement' : updated.sort,
        display: isMinSnorlaxRankDisplay ? 'drowsyPowerRequirement' : updated.display,
      };
    }
  }

  return updated;
};
