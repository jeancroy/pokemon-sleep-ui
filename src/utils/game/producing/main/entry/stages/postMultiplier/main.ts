import {defaultExtraTastyInfo} from '@/const/game/cooking/extraTasty';
import {IngredientMultiplier} from '@/types/game/producing/multiplier';
import {PokemonProductionInitial, PokemonProductionWithPayload} from '@/types/game/producing/rate/main';
import {applyExtraTastyInfo} from '@/utils/game/producing/apply/extraTasty';
import {applyIngredientMultiplier} from '@/utils/game/producing/apply/ingredient';
import {
  getPokemonProductionExtraTastyInfo,
} from '@/utils/game/producing/main/entry/stages/postMultiplier/extraTasty';
import {PokemonProductionInCalcWithPayload} from '@/utils/game/producing/main/entry/stages/type';


type GetPokemonProductionPostMultiplierOpts<TPayload> = {
  rates: PokemonProductionInCalcWithPayload<PokemonProductionInitial, TPayload>[],
  ingredientMultiplier: IngredientMultiplier,
};

export const getPokemonProductionPostMultiplier = <TPayload>({
  rates,
  ingredientMultiplier,
}: GetPokemonProductionPostMultiplierOpts<TPayload>): PokemonProductionWithPayload<
  TPayload,
  PokemonProductionInitial
>[] => {
  const extraTastyInfo = getPokemonProductionExtraTastyInfo({rates});

  return rates.map(({rate, calculatedUserConfig, payload}) => ({
    payload,
    metadata: {
      ingredientMultiplier,
      extraTastyInfo,
      calculatedUserConfig,
    },
    atStage: {
      // For `original`
      // - Apply default extra tasty info
      // - No ingredient multiplier
      original: applyExtraTastyInfo({
        rate,
        extraTastyInfo: defaultExtraTastyInfo,
      }),
      // For `final`
      // - Apply actual extra tasty info
      // - Apply ingredient multiplier
      final: applyExtraTastyInfo({
        rate: applyIngredientMultiplier({rate, ingredientMultiplier}),
        extraTastyInfo,
      }),
    },
  }));
};
