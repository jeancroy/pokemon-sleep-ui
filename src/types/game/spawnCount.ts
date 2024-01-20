import {Interval} from '@/types/compute';
import {SleepMapId} from '@/types/game/sleepStyle';


export type SpawnCountData = {
  mapId: SleepMapId,
  count: number,
  range: Interval,
};

export type SpawnCountDataMap = {[mapId in SleepMapId]?: SpawnCountData[]};
