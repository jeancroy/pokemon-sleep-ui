import {Ingredient} from '@/types/game/ingredient';
import {ProducingRateCommonParams, ProducingRateOfDrop} from '@/types/game/producing/rate';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateBase} from '@/utils/game/producing/toBase/main';
import {Nullable} from '@/utils/type';


type GetIngredientProducingRateBaseOpts = ProducingRateCommonParams & {
  ingredient: Nullable<Ingredient>,
  ingredientBranchCount: number,
  qtyPerHelp: number,
};

export const getIngredientProducingRateBase = ({
  baseFrequency,
  calculatedSettings,
  ingredient,
  ingredientBranchCount,
  qtyPerHelp,
}: GetIngredientProducingRateBaseOpts): ProducingRateOfDrop | null => {
  const {bonus} = calculatedSettings;

  if (!ingredient) {
    return null;
  }

  const {mapMultiplier} = bonus;
  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'cooking',
  });

  return getProducingRateBase({
    id: ingredient.id,
    baseFrequency,
    qtyPerHelp,
    strengthPerQtyPerHelp: ingredient.energy * mapMultiplier * strengthMultiplier,
    triggerRate: 1 / ingredientBranchCount,
  });
};
