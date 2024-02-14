import {SleepdexLookupDataEntry, SleepdexLookupSortType} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {getSnorlaxRankEquivalentNumber} from '@/utils/game/snorlax';


export const sleepdexLookupEntriesSortBasisGetter: {
  [sort in SleepdexLookupSortType]: (entry: SleepdexLookupDataEntry) => number
} = {
  drowsyPowerRequirement: ({spoRequirement}) => spoRequirement.drowsyScore,
  spo: ({spoRequirement}) => spoRequirement.spo,
  shards: ({sleepStyle}) => sleepStyle.rewards.shards,
  researchExp: ({sleepStyle}) => sleepStyle.rewards.exp,
  minSnorlaxRank: ({spoRequirement}) => (
    spoRequirement.snorlaxRankMinimum ? getSnorlaxRankEquivalentNumber(spoRequirement.snorlaxRankMinimum) : NaN
  ),
};
