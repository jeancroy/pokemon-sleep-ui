import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap} from '@/types/game/pokemon';
import {SleepMapId} from '@/types/game/sleepStyle';


export type UserConfigMapBonusDataProps = {
  mapIds: SleepMapId[],
  maxMapBonusPercent: number,
  pokedexMap: PokedexMap,
  fieldMetaMap: FieldMetaMap,
};
