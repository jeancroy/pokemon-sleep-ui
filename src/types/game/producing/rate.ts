import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {NatureId} from '@/types/game/pokemon/nature';
import {SeedUsage} from '@/types/game/pokemon/seed';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProductionPeriod} from '@/types/game/producing/display';
import {CarryLimitInfo, FullPackStats} from '@/types/game/producing/inventory';
import {ProduceSplit, ProducingStateSplit} from '@/types/game/producing/split';
import {ProducingStateCalculated, ProducingStateWithPack} from '@/types/game/producing/state';
import {CalculatedUserSettings} from '@/types/userData/settings/transformed';
import {Indexable} from '@/utils/type';


export type ProducingRate<T = number> = {
  period: ProductionPeriod,
  qty: T,
  strength: T,
};

export type ProducingRateOfDrop = ProducingRate & {
  id: number,
  // Rate of trigger (successful drop) in the format of 0.04 (for 4%).
  triggerRate: number,
  // Frequency of a trigger (successful drop).
  frequency: number,
  // Drop quantity per trigger (successful drop). For skill, this is always 1.
  qtyPerHelp: number,
  // Strength per trigger (successful drop).
  strengthPerHelp: number,
};

export type ProducingRateOfDropInSleep = {
  vacant: ProducingRateOfDrop,
  filled: ProducingRateOfDrop,
};

export type ProducingRateOfDropByStateWithPack = {[state in ProducingStateWithPack]: ProducingRateOfDrop} & {
  id: number,
};

export type ProducingValueByCalculatedStates = {[state in ProducingStateCalculated]: number};

export type ProducingRateByCalculatedStates = ProducingRate<ProducingValueByCalculatedStates> & {
  id: number,
  frequency: ProducingValueByCalculatedStates,
};

export type ProducingRateSingleParams = {
  subSkillBonus: GroupedSubSkillBonus | null,
  natureId: NatureId | null,
};

export type ProducingRateImplicitParams = {
  evolutionCount: number,
  seeds: SeedUsage,
};

export type ProducingRateIndividualParams = ProducingRateSingleParams & ProducingRateImplicitParams & {
  level: number,
};

export type ProducingRateCommonParams = {
  level: number,
  pokemon: PokemonInfo,
  baseFrequency: number,
  calculatedSettings: CalculatedUserSettings,
};

export type PokemonProducingRate = {
  period: ProductionPeriod,
  fullPackStats: FullPackStats,
  producingStateSplit: ProducingStateSplit,
  produceSplit: ProduceSplit,
  carryLimitInfo: CarryLimitInfo,
  skillRatePercent: number,
  berry: ProducingRateByCalculatedStates,
  ingredient: {[ingredientId in IngredientId]: ProducingRateByCalculatedStates},
  skill: ProducingRateByCalculatedStates,
};

export const pokemonProducingRateStage = [
  'original',
  'final',
] as const;

export type PokemonProducingRateStage = typeof pokemonProducingRateStage[number];

export type PokemonProducingRateAtStage = {[stage in PokemonProducingRateStage]: PokemonProducingRate};

export type PokemonProducingRateWithPayload<TPayload> = {
  payload: TPayload,
  calculatedSettings: CalculatedUserSettings,
  atStage: PokemonProducingRateAtStage,
};

export type PokemonProducingRateByType = {
  berry: GroupedProducingRate<BerryId>,
  ingredient: GroupedProducingRate<IngredientId>,
  skill: GroupedProducingRate<MainSkillId>,
};

export type PokemonProducingRateFinal<TPayload> = {
  rates: PokemonProducingRateWithPayload<TPayload>[],
  grouped: PokemonProducingRateByType,
};

export type GroupedProducingRate<TId extends Indexable> = {[id in TId]?: ProducingRate};
