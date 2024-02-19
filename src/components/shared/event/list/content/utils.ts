import {EventListGroupedData} from '@/components/shared/event/list/content/type';
import {EventInfo} from '@/types/game/event/info';


export const toEventListGroupedData = (eventInfoList: EventInfo[]): EventListGroupedData => {
  const currentEpochSec = Date.now() / 1000;

  return {
    upcoming: eventInfoList.filter(({startEpoch}) => (
      startEpoch > currentEpochSec
    )),
    current: eventInfoList.filter(({startEpoch, endEpoch}) => (
      currentEpochSec >= startEpoch && currentEpochSec < endEpoch
    )),
    ended: eventInfoList.filter(({endEpoch}) => (
      currentEpochSec >= endEpoch
    )),
  };
};
