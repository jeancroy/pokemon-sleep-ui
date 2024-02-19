import {IngredientCounter} from '@/types/game/ingredient';
import {GroupedProducingRate} from '@/types/game/producing/rate';
import {TeamMakerIngredientStats} from '@/ui/team/maker/type/common';
import {addIngredientCount, subtractIngredientCount} from '@/utils/game/ingredient/counter';
import {isNotNullish} from '@/utils/type';


type GetTeamMakerIngredientStatsOpts = {
  required: IngredientCounter,
  inventory: IngredientCounter,
  production: GroupedProducingRate<number>,
};

export const getTeamMakerIngredientStats = ({
  required,
  inventory,
  production,
}: GetTeamMakerIngredientStatsOpts): TeamMakerIngredientStats => {
  const supply = addIngredientCount([
    inventory,
    Object.fromEntries(Object.entries(production)
      .map(([id, rate]) => {
        if (!rate) {
          return null;
        }

        return [id, rate.qty];
      })
      .filter(isNotNullish),
    ),
  ]);

  return {
    supply,
    surplus: subtractIngredientCount(supply, required),
    shortage: subtractIngredientCount(required, supply),
  };
};
