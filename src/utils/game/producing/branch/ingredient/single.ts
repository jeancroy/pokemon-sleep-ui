import {Ingredient} from '@/types/game/ingredient';
import {
  ProducingRateCommonParams, ProducingRateOfBranch,
  ProducingRateOfBranchByState,
  ProducingRateProportion,
} from '@/types/game/producing/rate';
import {applyBonus} from '@/utils/game/producing/apply/bonus/bonusWithMultiplier';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateOfBranch} from '@/utils/game/producing/rateOfBranch';


export type GetIngredientProducingRateOpts = ProducingRateCommonParams & ProducingRateProportion & {
  ingredient: Ingredient | undefined,
};

export const getIngredientProducingRate = ({
  frequency,
  calculatedSettings,
  ingredient,
  count,
  picks,
}: GetIngredientProducingRateOpts): ProducingRateOfBranchByState | null => {
  const {bonus} = calculatedSettings;

  if (!ingredient) {
    return null;
  }

  const {mapMultiplier} = bonus;

  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'cooking',
  });
  const rateBase: ProducingRateOfBranch = getProducingRateOfBranch({
    id: ingredient.id,
    frequency,
    count,
    picks,
    energyPerCount: ingredient.energy * mapMultiplier,
  });

  return {
    id: ingredient.id,
    rateBase,
    sleep1: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'sleep1',
      rateBase,
    }),
    sleep2: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'sleep2',
      rateBase,
    }),
    awake: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'awake',
      rateBase,
    }),
  };
};
