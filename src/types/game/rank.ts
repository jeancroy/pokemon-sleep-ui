import {SleepMapId} from '@/types/game/sleepStyle';
import {SnorlaxDataAtRank} from '@/types/game/snorlax';


export type SnorlaxRankTitleId = number;

export type SnorlaxRank = {
  title: SnorlaxRankTitleId,
  number: number,
};

export type SnorlaxRankFinalEstimate = {
  mapId: SleepMapId,
  rank: SnorlaxDataAtRank | undefined,
};
