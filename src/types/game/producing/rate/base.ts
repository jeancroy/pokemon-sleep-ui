import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingStateCalculated, ProducingStateWithPack} from '@/types/game/producing/state';


export type Production<T = number> = {
  period: ProductionPeriod,
  qty: T,
  strength: T,
};

export type ProductionWithId<TValue = number, TId = number> = Production<TValue> & {
  id: TId,
};

export type ProductionOfDrop = Production & {
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

export type ProductionOfDropInSleep = {
  vacant: ProductionOfDrop,
  filled: ProductionOfDrop,
};

export type ProductionOfDropByStateWithPack = {[state in ProducingStateWithPack]: ProductionOfDrop} & {
  id: number,
};

export type ProductionValueByCalculatedStates = {[state in ProducingStateCalculated]: number};

export type ProductionByCalculatedStates = Production<ProductionValueByCalculatedStates> & {
  id: number,
  frequency: ProductionValueByCalculatedStates,
};
