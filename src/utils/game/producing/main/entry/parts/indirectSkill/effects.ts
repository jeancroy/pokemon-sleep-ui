import {PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {PokemonIndirectSkillEffects} from '@/types/game/producing/rate/skill';
import {toSum} from '@/utils/array';


type GetPokemonIndirectSkillEffectsOpts = {
  initialRates: PokemonProductionInitial[],
};

export const getPokemonIndirectSkillEffects = ({
  initialRates,
}: GetPokemonIndirectSkillEffectsOpts): PokemonIndirectSkillEffects => {
  const skillCount = initialRates.map((rate) => {
    const {intermediate, skill} = rate;
    const {activeSkillEffect} = intermediate;

    return {activeSkillEffect, count: skill.qty.equivalent};
  });

  return {
    totalExtraHelps: toSum(skillCount.map(({activeSkillEffect, count}) => {
      if (activeSkillEffect?.type !== 'help') {
        return 0;
      }

      return activeSkillEffect.count * count;
    })),
  };
};
