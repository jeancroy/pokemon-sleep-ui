import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {getSnorlaxRankAtStrength} from '@/utils/game/snorlax';


export type GetSnorlaxRankFinalEstimateOpts = {
  strength: number,
  snorlaxData: SnorlaxDataOfMap[],
};

export const getSnorlaxRankFinalEstimate = ({
  strength,
  snorlaxData,
}: GetSnorlaxRankFinalEstimateOpts) => snorlaxData.map(({mapId, data}): SnorlaxRankFinalEstimate => ({
  mapId,
  rank: getSnorlaxRankAtStrength({strength, data}),
}));
