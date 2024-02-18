import {IngredientCounter} from '@/types/game/ingredient';
import {MealPreparerIngredientStats} from '@/ui/cooking/prepare/type';
import {subtractIngredientCount} from '@/utils/game/ingredient/counter';


type GetMealPreparerIngredientStatsOpts = {
  required: IngredientCounter,
  inventory: IngredientCounter,
};

export const getMealPreparerIngredientStats = ({
  required,
  inventory,
}: GetMealPreparerIngredientStatsOpts): MealPreparerIngredientStats => {
  const filler = subtractIngredientCount(inventory, required);

  return {
    filler,
    missing: subtractIngredientCount(required, inventory),
    required,
  };
};
