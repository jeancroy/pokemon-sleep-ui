import {durationOfDay} from '@/const/common';
import {ProducingRateOfDrop} from '@/types/game/producing/rate/base';


type GetProducingRateBaseOpts = {
  id: number,
  baseFrequency: number,
  qtyPerHelp: number,
  strengthPerQtyPerHelp: number,
  triggerRate?: number,
};

export const getProducingRateBase = ({
  id,
  baseFrequency,
  qtyPerHelp,
  strengthPerQtyPerHelp,
  triggerRate,
}: GetProducingRateBaseOpts): ProducingRateOfDrop => {
  triggerRate ??= 1;

  const frequency = baseFrequency / triggerRate;
  const helpCount = durationOfDay / frequency;
  const strengthPerHelp = qtyPerHelp * strengthPerQtyPerHelp;

  return {
    id,
    frequency,
    triggerRate,
    period: 'daily',
    qty: helpCount * qtyPerHelp,
    qtyPerHelp,
    strength: helpCount * strengthPerHelp,
    strengthPerHelp,
  };
};
