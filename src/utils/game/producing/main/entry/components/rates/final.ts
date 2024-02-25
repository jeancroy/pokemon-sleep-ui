import {PokemonProductionInitial, PokemonProductionWithPayload} from '@/types/game/producing/rate/main';
import {getPokemonIndirectSkillEffects} from '@/utils/game/producing/main/entry/components/indirectSkill/effects';
import {
  getPokemonIndirectSkillProductionFromInitial,
} from '@/utils/game/producing/main/entry/components/indirectSkill/production';


type GetPokemonProductionFinalOpts<TPayload> = {
  initialRatesPostIngredient: PokemonProductionWithPayload<TPayload, PokemonProductionInitial>[],
  targetCount: number,
};

export const getPokemonProductionFinal = <TPayload>({
  initialRatesPostIngredient,
  targetCount,
}: GetPokemonProductionFinalOpts<TPayload>): PokemonProductionWithPayload<TPayload>[] => {
  const skillEffects = getPokemonIndirectSkillEffects({
    initialRates: initialRatesPostIngredient.map(({atStage}) => atStage.final),
  });

  return initialRatesPostIngredient.map(({atStage, ...rest}) => {
    const {original, final} = atStage;

    return {
      ...rest,
      atStage: {
        original: {
          ...original,
          skillIndirect: getPokemonIndirectSkillProductionFromInitial({
            initialRate: original,
            skillEffects,
            targetCount,
          }),
        },
        final: {
          ...final,
          skillIndirect: getPokemonIndirectSkillProductionFromInitial({
            initialRate: final,
            skillEffects,
            targetCount,
          }),
        },
      },
    };
  });
};
