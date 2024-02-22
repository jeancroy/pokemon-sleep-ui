import {PokemonProducingRateFirstPass, PokemonProducingRateWithPayload} from '@/types/game/producing/rate/main';
import {getPokemonIndirectSkillEffects} from '@/utils/game/producing/main/entry/components/indirectSkill/effects';
import {
  getPokemonIndirectSkillProductionFromFirstPass,
} from '@/utils/game/producing/main/entry/components/indirectSkill/production';


type GetPokemonProducingRateFinalOpts<TPayload> = {
  firstPassRatesPostIngredient: PokemonProducingRateWithPayload<TPayload, PokemonProducingRateFirstPass>[],
  targetCount: number,
};

export const getPokemonProducingRateFinal = <TPayload>({
  firstPassRatesPostIngredient,
  targetCount,
}: GetPokemonProducingRateFinalOpts<TPayload>): PokemonProducingRateWithPayload<TPayload>[] => {
  const skillEffects = getPokemonIndirectSkillEffects({
    firstPassRates: firstPassRatesPostIngredient.map(({atStage}) => atStage.final),
  });

  return firstPassRatesPostIngredient.map(({atStage, ...rest}) => {
    const {original, final} = atStage;

    return {
      ...rest,
      atStage: {
        original: {
          ...original,
          skillIndirect: getPokemonIndirectSkillProductionFromFirstPass({
            firstPassRate: original,
            skillEffects,
            targetCount,
          }),
        },
        final: {
          ...final,
          skillIndirect: getPokemonIndirectSkillProductionFromFirstPass({
            firstPassRate: final,
            skillEffects,
            targetCount,
          }),
        },
      },
    };
  });
};
