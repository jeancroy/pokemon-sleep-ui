import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingStateCalculated, ProducingStateWithPack} from '@/types/game/producing/state';


export type ProducingRate<T = number> = {
  period: ProductionPeriod,
  qty: T,
  strength: T,
};

export type ProducingRateWithId<TValue = number, TId = number> = ProducingRate<TValue> & {
  id: TId,
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
