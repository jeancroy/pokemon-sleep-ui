import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {ProductionPeriod} from '@/types/game/producing/display';
import {GroupedProductionByType} from '@/types/game/producing/rate/main';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {getIngredientMultiplier} from '@/utils/game/producing/ingredient/multiplier';
import {isNotNullish} from '@/utils/type';


export type GetPokemonProductionIngredientMultiplierOpts = {
  period: ProductionPeriod,
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  groupedOriginalRates: GroupedProductionByType,
  calculatedCookingConfig: CalculatedCookingConfig,
};

export const getPokemonProductionIngredientMultiplier = ({
  period,
  ingredientMap,
  recipeLevelData,
  groupedOriginalRates,
  calculatedCookingConfig,
}: GetPokemonProductionIngredientMultiplierOpts) => {
  return getIngredientMultiplier({
    ingredientMap,
    recipeLevelData,
    production: Object.fromEntries(Object.entries(groupedOriginalRates.ingredient)
      .map(([id, rate]) => {
        if (!rate) {
          return null;
        }

        return [id, rate.qty];
      })
      .filter(isNotNullish)),
    period,
    calculatedCookingConfig,
  });
};
