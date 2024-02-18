import {durationOfDay} from '@/const/common';
import {ProducingRateOfBranch, ProducingRateProportion} from '@/types/game/producing/rate';


type GetProducingRateOfBranchOpts = ProducingRateProportion & {
  id: number,
  frequency: number,
  energyPerCount: number,
};

export const getProducingRateOfBranch = ({
  id,
  frequency,
  energyPerCount,
  count,
  picks,
}: GetProducingRateOfBranchOpts): ProducingRateOfBranch => {
  const helpCount = durationOfDay / frequency;
  const qtyPerHelp = count / picks;

  return {
    id,
    frequency,
    period: 'daily',
    energy: helpCount * qtyPerHelp * energyPerCount,
    quantity: helpCount * qtyPerHelp,
    qtyPerHelp,
  };
};
