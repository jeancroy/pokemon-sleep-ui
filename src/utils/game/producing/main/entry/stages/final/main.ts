import {PokemonProductionInitial, PokemonProductionWithPayload} from '@/types/game/producing/rate/main';
import {getPokemonIndirectSkillEffects} from '@/utils/game/producing/main/entry/parts/indirectSkill/effects';
import {getPokemonProductionFinalOfStage} from '@/utils/game/producing/main/entry/stages/final/ofStage';


type GetPokemonProductionFinalOpts<TPayload> = {
  postMultiplierRates: PokemonProductionWithPayload<TPayload, PokemonProductionInitial>[],
  targetCount: number,
};

export const getPokemonProductionFinal = <TPayload>({
  postMultiplierRates,
  targetCount,
}: GetPokemonProductionFinalOpts<TPayload>): PokemonProductionWithPayload<TPayload>[] => {
  const skillEffects = getPokemonIndirectSkillEffects({
    // Using `final` or `original` will not cause any difference here
    initialRates: postMultiplierRates.map(({atStage}) => atStage.final),
  });

  return postMultiplierRates.map(({atStage, ...rest}) => {
    const {original, final} = atStage;

    return {
      ...rest,
      atStage: {
        original: getPokemonProductionFinalOfStage({
          rate: original,
          skillEffects,
          targetCount,
        }),
        final: getPokemonProductionFinalOfStage({
          rate: final,
          skillEffects,
          targetCount,
        }),
      },
    };
  });
};
