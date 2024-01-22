import {GameEventId} from '@/types/game/event';
import {PokemonId} from '@/types/game/pokemon';
import {SnorlaxRank} from '@/types/game/rank';


export type SleepMapId = number;

export type SleepStyleId = number | 'onSnorlax';

export type SleepStyleInternalId = number;

export type SleepReward = {
  exp: number,
  shards: number,
  candy: number,
};

export type SleepStyleSpoRequirement = {
  drowsyScore: number,
  snorlaxStrength: number,
  snorlaxRankMinimum: SnorlaxRank | null,
};

export type SleepStyleNameI18nKey = string;

export type SleepStyleCommon = {
  style: SleepStyleId,
  spo: number,
  rarity: number,
  rewards: SleepReward,
  i18nKey: SleepStyleNameI18nKey,
  internalId: SleepStyleInternalId,
};

export type SleepStyle = SleepStyleCommon & {
  rank: SnorlaxRank,
  events: GameEventId[],
};

export type SleepStyleNormal = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  styles: SleepStyle[],
};

export type SleepStyleNormalFlattened = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  style: SleepStyle,
};

export type SleepStyleNormalMap = {[id in PokemonId]?: SleepStyleNormal[]};

export type FieldToFlattenedSleepStyleMap = {[id in SleepMapId]?: SleepStyleNormalFlattened[]};

export type SleepStyleSpecial = SleepStyleCommon & {
  pokemonId: PokemonId,
  unreleased: boolean,
};

export type SleepStyleSpecialMap = {[id in PokemonId]?: SleepStyleSpecial[]};

export type SleepStyleMerged = SleepStyleCommon & {
  pokemonId: PokemonId,
  mapIds: SleepMapId[],
  rank: SnorlaxRank | null,
  incenseOnly: boolean,
};
