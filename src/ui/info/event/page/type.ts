import {EventDrowsyPowerMultiplierEntry} from '@/types/game/event/drowsyPowerMultiplier';
import {EventInfo} from '@/types/game/event/info';
import {EventMissionMap} from '@/types/game/event/mission';
import {EventStrengthMultiplierEntry} from '@/types/game/event/strengthMultiplier';


export type EventPageDataProps = {
  eventInfo: EventInfo,
  eventMissionMap: EventMissionMap,
  strengthMultiplierEntries: EventStrengthMultiplierEntry[],
  drowsyPowerMultiplierEntries: EventDrowsyPowerMultiplierEntry[],
};
