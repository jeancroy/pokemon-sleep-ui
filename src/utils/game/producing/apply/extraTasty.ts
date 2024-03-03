import {ExtraTastyInfo} from '@/types/game/cooking/extraTasty';
import {PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {applyMultiplierOnIngredientStrength} from '@/utils/game/producing/apply/base/onIngredientStrength';


type ApplyIngredientMultiplierOpts<TProduction extends PokemonProductionInitial> = {
  rate: TProduction,
  extraTastyInfo: ExtraTastyInfo,
};

export const applyExtraTastyInfo = <TProduction extends PokemonProductionInitial>({
  rate,
  extraTastyInfo,
}: ApplyIngredientMultiplierOpts<TProduction>): TProduction => {
  return applyMultiplierOnIngredientStrength({
    rate,
    getMultiplier: () => extraTastyInfo.overall.multiplier,
  });
};
