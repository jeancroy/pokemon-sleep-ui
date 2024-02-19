import {EventInfo} from '@/types/game/event/info';


export type EventListGroupedData = {
  upcoming: EventInfo[],
  current: EventInfo[],
  ended: EventInfo[],
};
