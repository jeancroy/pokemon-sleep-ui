import {Ingredient} from '@/types/game/ingredient';
import {ProductionOfDrop} from '@/types/game/producing/rate/base';
import {ProductionCommonParams} from '@/types/game/producing/rate/params';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProductionBase} from '@/utils/game/producing/toBase/main';
import {Nullable} from '@/utils/type';


type GetIngredientProductionBaseOpts = ProductionCommonParams & {
  ingredient: Nullable<Ingredient>,
  ingredientBranchCount: number,
  qtyPerHelp: number,
};

export const getIngredientProductionBase = ({
  baseFrequency,
  calculatedUserConfig,
  ingredient,
  ingredientBranchCount,
  qtyPerHelp,
}: GetIngredientProductionBaseOpts): ProductionOfDrop | null => {
  const {bonus} = calculatedUserConfig;

  if (!ingredient) {
    return null;
  }

  const {mapMultiplier} = bonus;
  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'cooking',
  });

  return getProductionBase({
    id: ingredient.id,
    baseFrequency,
    qtyPerHelp,
    strengthPerQtyPerHelp: ingredient.energy * mapMultiplier * strengthMultiplier,
    triggerRate: 1 / ingredientBranchCount,
  });
};
