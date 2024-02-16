import {EventDrowsyPowerMultiplierEntry} from '@/types/game/event/drowsyPowerMultiplier';
import {EventInfo} from '@/types/game/event/info';
import {EventMissionMap} from '@/types/game/event/mission';
import {EventStrengthMultiplierEntry} from '@/types/game/event/strengthMultiplier';
import {PokedexMap} from '@/types/game/pokemon';


export type EventPageDataProps = {
  eventInfo: EventInfo,
  pokedexMap: PokedexMap,
  eventMissionMap: EventMissionMap,
  strengthMultiplierEntries: EventStrengthMultiplierEntry[],
  drowsyPowerMultiplierEntries: EventDrowsyPowerMultiplierEntry[],
};
