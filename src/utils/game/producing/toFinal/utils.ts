import {ProductionOfDrop} from '@/types/game/producing/rate/base';


type ToFinalProductionFromBaseOpts = {
  base: ProductionOfDrop,
} & ({
  isFullPack?: never,
  override: Pick<ProductionOfDrop, 'qty' | 'strength' | 'frequency'>,
} | {
  isFullPack: true,
  override?: never,
});

export const toFinalProductionFromBase = ({
  base,
  isFullPack,
  override,
}: ToFinalProductionFromBaseOpts): ProductionOfDrop => {
  // Destruct then return so it errors when a new property is introduced in `ProductionOfDrop`
  const {
    id,
    triggerRate,
    period,
    strengthPerHelp,
    qtyPerHelp,
  } = base;

  if (isFullPack) {
    return {
      id,
      triggerRate,
      period,
      strengthPerHelp,
      qtyPerHelp,
      qty: 0,
      strength: 0,
      frequency: Infinity,
    };
  }

  return {
    id,
    triggerRate,
    period,
    strengthPerHelp,
    qtyPerHelp,
    ...override,
  };
};
