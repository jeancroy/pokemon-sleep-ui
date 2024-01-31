import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {SleepMapId} from '@/types/game/sleepStyle';


export type UserSettingsBonusDataProps = {
  mapIds: SleepMapId[],
  maxMapBonusPercent: number,
  pokemonList: PokemonInfo[],
  mapMeta: FieldMetaMap,
};
