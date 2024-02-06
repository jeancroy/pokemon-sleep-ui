import {specialtyIdMap} from '@/const/game/pokemon';
import {Ingredient} from '@/types/game/ingredient';
import {
  ProducingRateCommonParams,
  ProducingRateOfItemOfSessions,
  ProducingRateProportion,
} from '@/types/game/producing/rate';
import {applyBonus} from '@/utils/game/producing/apply/bonus';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateBase} from '@/utils/game/producing/rateBase';


export type GetIngredientProducingRateOpts = ProducingRateCommonParams & {
  ingredient: Ingredient | undefined,
} & (
  ProducingRateProportion | {
    count?: never,
    picks?: never,
  }
);

export const getIngredientProducingRate = ({
  pokemon,
  frequency,
  calculatedSettings,
  ingredient,
  count,
  picks,
}: GetIngredientProducingRateOpts): ProducingRateOfItemOfSessions | null => {
  const {bonus} = calculatedSettings;

  if (!ingredient) {
    return null;
  }

  const {mapMultiplier} = bonus;

  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'cooking',
  });
  const data = {
    id: ingredient.id,
    frequency,
    ...getProducingRateBase({
      frequency,
      count: count || (pokemon.specialty === specialtyIdMap.ingredient ? 2 : 1),
      picks: picks ?? 1,
      energyPerCount: ingredient.energy * mapMultiplier,
    }),
  };

  return {
    id: ingredient.id,
    sleep1: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'sleep1',
      data,
    }),
    sleep2: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'sleep2',
      data,
    }),
    awake: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'awake',
      data,
    }),
  };
};
