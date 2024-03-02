import {EventDrowsyPowerMultiplierData} from '@/types/game/event/drowsyPowerMultiplier';
import {SleepMapId, SleepStyleNormalFlattened, SleepStyleSpecial} from '@/types/game/sleepStyle';
import {SnorlaxDataMap} from '@/types/game/snorlax';


export type SleepdexLookupServerDataProps = {
  snorlaxDataMap: SnorlaxDataMap,
  eventDrowsyPowerMultiplierData: EventDrowsyPowerMultiplierData,
  sleepStyles: {
    normal: SleepStyleNormalFlattened[],
    special: SleepStyleSpecial[],
  },
  mapIds: SleepMapId[],
};
