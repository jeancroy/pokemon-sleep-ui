import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {ProductionPeriod} from '@/types/game/producing/display';
import {GroupedProducingRateByType} from '@/types/game/producing/rate/main';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {getIngredientMultiplier} from '@/utils/game/producing/ingredient/multiplier';
import {isNotNullish} from '@/utils/type';


export type GetPokemonProducingRateIngredientMultiplierOpts = {
  period: ProductionPeriod,
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  groupedOriginalRates: GroupedProducingRateByType,
  calculatedCookingConfig: CalculatedCookingConfig,
};

export const getPokemonProducingRateIngredientMultiplier = ({
  period,
  ingredientMap,
  recipeLevelData,
  groupedOriginalRates,
  calculatedCookingConfig,
}: GetPokemonProducingRateIngredientMultiplierOpts) => {
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
