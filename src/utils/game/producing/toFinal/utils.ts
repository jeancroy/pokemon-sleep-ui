import {ProducingRateOfDrop} from '@/types/game/producing/rate';


type ToFinalProducingRateFromBaseOpts = {
  base: ProducingRateOfDrop,
} & ({
  isFullPack?: never,
  override: Pick<ProducingRateOfDrop, 'qty' | 'strength' | 'frequency'>,
} | {
  isFullPack: true,
  override?: never,
});

export const toFinalProducingRateFromBase = ({
  base,
  isFullPack,
  override,
}: ToFinalProducingRateFromBaseOpts): ProducingRateOfDrop => {
  // Destruct then return so it errors when a new property is introduced in `ProducingRateOfDrop`
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
