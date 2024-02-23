import {durationOfDay} from '@/const/common';
import {ProductionOfDrop} from '@/types/game/producing/rate/base';


type GetProductionBaseOpts = {
  id: number,
  baseFrequency: number,
  qtyPerHelp: number,
  strengthPerQtyPerHelp: number,
  triggerRate?: number,
};

export const getProductionBase = ({
  id,
  baseFrequency,
  qtyPerHelp,
  strengthPerQtyPerHelp,
  triggerRate,
}: GetProductionBaseOpts): ProductionOfDrop => {
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
