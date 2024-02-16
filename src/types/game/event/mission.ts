import {EventId} from '@/types/game/event/common';
import {Mission} from '@/types/game/mission';


export type EventMission = Mission & {
  eventId: EventId,
};

export type EventMissionMap = {[eventId in EventId]?: EventMission[]};
