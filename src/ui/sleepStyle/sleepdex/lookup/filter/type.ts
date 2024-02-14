import {PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {SleepdexStyleId} from '@/types/game/sleepdex';
import {SleepMapId, SleepStyleMerged, SleepStyleSpoRequirement} from '@/types/game/sleepStyle';


export const sleepdexLookupSortType = [
  'drowsyPowerRequirement',
  'spo',
  'shards',
  'researchExp',
  'minSnorlaxRank',
] as const;

export type SleepdexLookupSortType = typeof sleepdexLookupSortType[number];

export type SleepdexLookupDisplayType = SleepdexLookupSortType;

export type SleepdexLookupFilter = PokemonInputFilter & {
  mapId: SleepMapId | null,
  drowsyPowerMultiplier: number,
  drowsyPowerRequirement: number,
  incenseOnly: boolean,
  display: SleepdexLookupDisplayType,
  sort: SleepdexLookupSortType,
};

export type SleepdexLookupFilterEnforcingCommonOpts = {
  isPremium: boolean,
  showMapToast: () => void,
  showPremiumRequired: () => void,
};

export type SleepdexLookupDataEntry = {
  sleepdexStyleId: SleepdexStyleId,
  sleepStyle: SleepStyleMerged,
  spoRequirement: SleepStyleSpoRequirement,
  pokemon: PokemonInfo,
};
